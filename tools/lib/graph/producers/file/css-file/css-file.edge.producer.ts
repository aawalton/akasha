import { defineEdgeProducer } from "../../../define-edge-producer.ts"
import { nodeKey } from "../../../key.ts"
import { readRepoFile } from "../../../repos.ts"
import type { EdgeInit, Graph } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { repoTree } from "../../lib/repo-tree.ts"
import { resolvePackageExport } from "../../lib/resolve-package-export.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../../package/types.ts"
import { resolveRelativeToRepoRelative } from "./discover.ts"
import {
  extractImportSpecifiers,
  extractPackageName,
  extractSubPath,
  isRelativeSpecifier,
  isTemplateSpecifier,
  isUrlSpecifier,
} from "./extract.ts"
import {
  CSS_FILE_NODE_TYPE,
  CSS_IMPORTS_EDGE_TYPE,
  CSS_SOURCE_EDGE_TYPE,
  type CssDirective,
  CssFileAttrsSchema,
  type CssImportsAttrs,
  type CssSourceAttrs,
} from "./types.ts"

type WorkspaceView = {
  readonly name: string
  readonly path: string
  readonly sourceRoot: string
  readonly exports: Record<string, string> | null
}

const SUB_PATH_EXTENSIONS = [".css", "/index.css", ""]
const BARE_IMPORT_CANDIDATES = ["index.css", "src/index.css", "styles.css", "src/styles.css"]
const acceptCss = (resolvedRepoRel: string): boolean => resolvedRepoRel.endsWith(".css")

const cssFileKey = (relPath: string): string =>
  nodeKey({ type: CSS_FILE_NODE_TYPE, repo: CODE_REPO, key: relPath })

const packageKey = (name: string): string =>
  nodeKey({ type: PACKAGE_NODE_TYPE, repo: CODE_REPO, key: name })

const collectWorkspaceViews = (upstream: Graph): readonly WorkspaceView[] => {
  const out: WorkspaceView[] = []
  for (const node of upstream.nodes(PACKAGE_NODE_TYPE)) {
    const attrs = PackageAttrsSchema.parse(node.attrs)
    if (attrs.path === "") continue
    out.push({
      name: attrs.name,
      path: attrs.path,
      sourceRoot: attrs.sourceRoot,
      exports: attrs.exports,
    })
  }
  return out
}

const buildImportEdgesForFile = (
  fileRelPath: string,
  content: string,
  workspacesByName: ReadonlyMap<string, WorkspaceView>,
  exists: (repoRelPath: string) => boolean
): readonly EdgeInit[] => {
  const fromId = cssFileKey(fileRelPath)
  const out: EdgeInit[] = []

  for (const { specifier, line } of extractImportSpecifiers(content)) {
    if (isTemplateSpecifier(specifier)) continue
    if (isUrlSpecifier(specifier)) continue

    if (isRelativeSpecifier(specifier)) {
      const resolvedRel = resolveRelativeToRepoRelative(specifier, fileRelPath)
      if (resolvedRel === null) continue
      const attrs: CssImportsAttrs = { specifier, resolved: resolvedRel, line }
      const edge: EdgeInit<"css-imports", CssImportsAttrs> = {
        type: CSS_IMPORTS_EDGE_TYPE,
        from: fromId,
        to: cssFileKey(resolvedRel),
        attrs,
      }
      out.push(edge)
      continue
    }

    const pkgName = extractPackageName(specifier)
    if (pkgName === null) continue

    const ws = workspacesByName.get(pkgName)
    if (ws === undefined) continue

    const subPath = extractSubPath(specifier)
    const resolvedRel = resolvePackageExport({
      subPath,
      exports: ws.exports,
      packagePath: ws.path,
      bareImportCandidates: BARE_IMPORT_CANDIDATES,
      subPathExtensions: SUB_PATH_EXTENSIONS,
      acceptResolved: acceptCss,
      exists,
    })

    if (resolvedRel !== null) {
      const attrs: CssImportsAttrs = { specifier, resolved: resolvedRel, line }
      const edge: EdgeInit<"css-imports", CssImportsAttrs> = {
        type: CSS_IMPORTS_EDGE_TYPE,
        from: fromId,
        to: cssFileKey(resolvedRel),
        attrs,
      }
      out.push(edge)
      continue
    }

    const attrs: CssImportsAttrs = { specifier, resolved: null, line }
    const edge: EdgeInit<"css-imports", CssImportsAttrs> = {
      type: CSS_IMPORTS_EDGE_TYPE,
      from: fromId,
      to: packageKey(pkgName),
      attrs,
    }
    out.push(edge)
  }

  return out
}

const findOwningWorkspace = (
  resolvedBaseRel: string,
  workspaces: readonly WorkspaceView[]
): WorkspaceView | null => {
  for (const ws of workspaces) {
    if (resolvedBaseRel === ws.sourceRoot) return ws
    if (resolvedBaseRel.startsWith(`${ws.sourceRoot}/`)) return ws
  }
  return null
}

const buildSourceEdgesForFile = (
  fileRelPath: string,
  directives: readonly CssDirective[],
  workspaces: readonly WorkspaceView[]
): readonly EdgeInit[] => {
  const fromId = cssFileKey(fileRelPath)
  const out: EdgeInit[] = []

  for (const d of directives) {
    if (d.resolvedBase === null) continue
    if (d.negated) continue
    const owner = findOwningWorkspace(d.resolvedBase, workspaces)
    if (owner === null) continue

    const attrs: CssSourceAttrs = {
      raw: d.raw,
      pattern: d.pattern,
      line: d.line,
      negated: false,
      resolvedBase: d.resolvedBase,
    }
    const edge: EdgeInit<"css-source", CssSourceAttrs> = {
      type: CSS_SOURCE_EDGE_TYPE,
      from: fromId,
      to: packageKey(owner.name),
      attrs,
    }
    out.push(edge)
  }

  return out
}

export const cssFileEdgeProducer = defineEdgeProducer({
  name: "css-file-edge",
  edgeTypes: [CSS_IMPORTS_EDGE_TYPE, CSS_SOURCE_EDGE_TYPE],
  dependsOn: ["file", "package"],
  build: (ctx, upstream) => {
    const workspaces = collectWorkspaceViews(upstream)
    const byName = new Map<string, WorkspaceView>()
    for (const ws of workspaces) byName.set(ws.name, ws)
    const tree = repoTree(ctx, CODE_REPO)
    const exists = (repoRelPath: string): boolean => tree.hasPath(repoRelPath)

    const edges: EdgeInit[] = []
    for (const node of upstream.nodes(CSS_FILE_NODE_TYPE)) {
      const attrs = CssFileAttrsSchema.parse(node.attrs)
      const content = readRepoFile(ctx, CODE_REPO, attrs.path)
      if (content === null) continue
      for (const e of buildImportEdgesForFile(attrs.path, content, byName, exists)) {
        edges.push(e)
      }
      for (const e of buildSourceEdgesForFile(attrs.path, attrs.directives, workspaces)) {
        edges.push(e)
      }
    }
    return { edges }
  },
})

export default cssFileEdgeProducer
