import { posix } from "node:path"
import { defineEdgeProducer } from "../../../define-edge-producer.ts"
import { nodeKey } from "../../../key.ts"
import { readRepoFile } from "../../../repos.ts"
import type { EdgeInit, Graph } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { repoTree } from "../../lib/repo-tree.ts"
import { resolvePackageExport } from "../../lib/resolve-package-export.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../../package/types.ts"
import { tsFileNodeTypeOf } from "../ts-file/types.ts"
import {
  extractCodeFenceBlocks,
  extractImportSpecifiers,
  extractPackageName,
  extractSubPath,
  isExcludedSpecifier,
  isTemplateSpecifier,
} from "./extract.ts"
import { parseMdLinks } from "./parse.ts"
import {
  FILE_NODE_TYPE,
  MD_FILE_NODE_TYPE,
  MD_IMPORTS_EDGE_TYPE,
  MD_LINK_EDGE_TYPE,
  MdFileAttrsSchema,
  type MdImportsAttrs,
  type MdLinkAttrs,
} from "./types.ts"

type WorkspaceView = {
  readonly path: string
  readonly exports: Record<string, string> | null
}

const SUB_PATH_EXTENSIONS = [".ts", ".tsx", "/index.ts", "/index.tsx", ""]
const BARE_IMPORT_CANDIDATES = ["index.ts", "index.tsx", "src/index.ts", "src/index.tsx"]

const mdFileKey = (relPath: string): string =>
  nodeKey({ type: MD_FILE_NODE_TYPE, repo: CODE_REPO, key: relPath })

const collectWorkspaceViews = (upstream: Graph): ReadonlyMap<string, WorkspaceView> => {
  const out = new Map<string, WorkspaceView>()
  for (const node of upstream.nodes(PACKAGE_NODE_TYPE)) {
    const attrs = PackageAttrsSchema.parse(node.attrs)
    out.set(attrs.name, { path: attrs.path, exports: attrs.exports })
  }
  return out
}

const buildImportEdgesForFile = (
  fileRelPath: string,
  content: string,
  workspaces: ReadonlyMap<string, WorkspaceView>,
  exists: (repoRelPath: string) => boolean
): readonly EdgeInit[] => {
  const fromId = mdFileKey(fileRelPath)
  const edges: EdgeInit[] = []

  for (const block of extractCodeFenceBlocks(content)) {
    for (const { specifier, line } of extractImportSpecifiers(block.code, block.startLine)) {
      if (isTemplateSpecifier(specifier)) continue
      if (isExcludedSpecifier(specifier)) continue

      const pkgName = extractPackageName(specifier)
      const ws = pkgName === null ? undefined : workspaces.get(pkgName)
      if (pkgName === null || ws === undefined) continue

      const subPath = extractSubPath(specifier)
      const resolvedRel = resolvePackageExport({
        subPath,
        exports: ws.exports,
        packagePath: ws.path,
        bareImportCandidates: BARE_IMPORT_CANDIDATES,
        subPathExtensions: SUB_PATH_EXTENSIONS,
        acceptResolved: () => true,
        exists,
      })

      const edgeAttrs: MdImportsAttrs = { specifier, resolved: resolvedRel, line }
      const edge: EdgeInit<"md-imports", MdImportsAttrs> = {
        type: MD_IMPORTS_EDGE_TYPE,
        from: fromId,
        to:
          resolvedRel !== null
            ? nodeKey({ type: tsFileNodeTypeOf(resolvedRel), repo: CODE_REPO, key: resolvedRel })
            : nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: pkgName }),
        attrs: edgeAttrs,
      }
      edges.push(edge)
    }
  }

  return edges
}

const buildLinkEdgesForFile = (
  fileRelPath: string,
  content: string,
  knownMdRelPaths: ReadonlySet<string>
): readonly EdgeInit[] => {
  const fromId = mdFileKey(fileRelPath)
  const baseDir = posix.dirname(fileRelPath)
  const edges: EdgeInit[] = []

  for (const { target, fragment, line } of parseMdLinks(content)) {
    const resolvedRel =
      target === "" ? fileRelPath : posix.normalize(posix.join(baseDir, target))
    const toId = knownMdRelPaths.has(resolvedRel)
      ? mdFileKey(resolvedRel)
      : nodeKey({ type: FILE_NODE_TYPE, repo: CODE_REPO, key: resolvedRel })
    const attrs: MdLinkAttrs = {
      line,
      rawHref: target,
      fragment,
      resolvedRel,
    }
    const edge: EdgeInit<"md-link", MdLinkAttrs> = {
      type: MD_LINK_EDGE_TYPE,
      from: fromId,
      to: toId,
      attrs,
    }
    edges.push(edge)
  }

  return edges
}

export const mdFileEdgeProducer = defineEdgeProducer({
  name: "md-file-edge",
  edgeTypes: [MD_IMPORTS_EDGE_TYPE, MD_LINK_EDGE_TYPE],
  dependsOn: ["file", "package"],
  build: (ctx, upstream) => {
    const workspaces = collectWorkspaceViews(upstream)
    const mdFileNodes = upstream.nodes(MD_FILE_NODE_TYPE)
    const knownMdRelPaths = new Set<string>()
    for (const node of mdFileNodes) {
      knownMdRelPaths.add(MdFileAttrsSchema.parse(node.attrs).path)
    }
    const tree = repoTree(ctx, CODE_REPO)
    const exists = (repoRelPath: string): boolean => tree.hasPath(repoRelPath)

    const edges: EdgeInit[] = []
    for (const node of mdFileNodes) {
      const attrs = MdFileAttrsSchema.parse(node.attrs)
      const content = readRepoFile(ctx, CODE_REPO, attrs.path)
      if (content === null) continue
      for (const e of buildImportEdgesForFile(attrs.path, content, workspaces, exists)) {
        edges.push(e)
      }
      for (const e of buildLinkEdgesForFile(attrs.path, content, knownMdRelPaths)) {
        edges.push(e)
      }
    }
    return { edges }
  },
})

export default mdFileEdgeProducer
