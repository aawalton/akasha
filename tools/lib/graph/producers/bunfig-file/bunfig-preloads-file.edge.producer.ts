import { posix } from "node:path"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { readRepoFile } from "../../repos.ts"
import type { EdgeInit, Node } from "../../types.ts"
import { TOML_FILE_NODE_TYPE, TomlFileAttrsSchema } from "../file/toml-file/types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { repoTree } from "../lib/repo-tree.ts"
import { resolvePackageExport } from "../lib/resolve-package-export.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../package/types.ts"
import { BUNFIG_PRELOADS_FILE_EDGE_TYPE, type BunfigPreloadsFileAttrs } from "./types.ts"

type Workspace = {
  readonly path: string
  readonly exports: Record<string, string> | null
}

const BUNFIG_NAME = "bunfig.toml"

const PRELOADED = /preload\s*=\s*\[([^\]]*)\]/g

const QUOTED = /"([^"\n]*)"/g

const SUB_PATH_EXTENSIONS = [".ts", ".tsx", "/index.ts", "/index.tsx", ""]

const BARE_IMPORT_CANDIDATES = ["index.ts", "index.tsx", "src/index.ts", "src/index.tsx"]

export const preloaded = (body: string): readonly string[] => {
  const named: string[] = []
  for (const found of body.matchAll(PRELOADED)) {
    for (const one of (found[1] ?? "").matchAll(QUOTED)) {
      const spelled = one[1] ?? ""
      if (spelled !== "") named.push(spelled)
    }
  }
  return named
}

export const packageOf = (specifier: string): string | null => {
  const parts = specifier.split("/")
  const head = parts[0]
  if (head === undefined || head === "") return null
  if (!head.startsWith("@")) return head
  const second = parts[1]
  return second === undefined || second === "" ? null : `${head}/${second}`
}

export const subPathOf = (specifier: string): string | null => {
  const parts = specifier.split("/")
  const used = specifier.startsWith("@") ? 2 : 1
  return parts.length <= used ? null : `./${parts.slice(used).join("/")}`
}

export const standingAt = (bunfig: string, spelled: string): string | null => {
  const at = posix.normalize(posix.join(posix.dirname(bunfig), spelled))
  return at.startsWith("..") || at.startsWith("/") ? null : at
}

const standingInWorkspace = (
  specifier: string,
  workspaces: ReadonlyMap<string, Workspace>,
  exists: (relPath: string) => boolean
): string | null => {
  const name = packageOf(specifier)
  const workspace = name === null ? undefined : workspaces.get(name)
  if (workspace === undefined) return null
  return resolvePackageExport({
    subPath: subPathOf(specifier),
    exports: workspace.exports,
    packagePath: workspace.path,
    bareImportCandidates: BARE_IMPORT_CANDIDATES,
    subPathExtensions: SUB_PATH_EXTENSIONS,
    acceptResolved: () => true,
    exists,
  })
}

export const bunfigFileEdgeProducer = defineEdgeProducer({
  name: "bunfig-file-edge",
  edgeTypes: [BUNFIG_PRELOADS_FILE_EDGE_TYPE],
  dependsOn: ["file", "package"],
  build: (ctx, upstream) => {
    const workspaces = new Map<string, Workspace>()
    for (const node of upstream.nodes(PACKAGE_NODE_TYPE)) {
      if (node.repo !== CODE_REPO) continue
      const attrs = PackageAttrsSchema.parse(node.attrs)
      workspaces.set(attrs.name, { path: attrs.path, exports: attrs.exports })
    }

    const tree = repoTree(ctx, CODE_REPO)
    const exists = (relPath: string): boolean => tree.hasFile(relPath)
    const fileAt = (at: string): Node | undefined =>
      upstream.nodesByKey(at, CODE_REPO).find((one: Node) => one.type.endsWith("-file"))

    const edges: EdgeInit[] = []
    for (const node of upstream.nodes(TOML_FILE_NODE_TYPE)) {
      if (node.repo !== CODE_REPO) continue
      const from = TomlFileAttrsSchema.parse(node.attrs).path
      if (posix.basename(from) !== BUNFIG_NAME) continue
      const body = readRepoFile(ctx, CODE_REPO, from)
      if (body === null) continue
      for (const spelled of preloaded(body)) {
        const at = spelled.startsWith(".")
          ? standingAt(from, spelled)
          : standingInWorkspace(spelled, workspaces, exists)
        if (at === null) continue
        const target = fileAt(at)
        if (target === undefined) continue
        const attrs: BunfigPreloadsFileAttrs = { specifier: spelled }
        edges.push({
          type: BUNFIG_PRELOADS_FILE_EDGE_TYPE,
          from: node.id,
          to: target.id,
          attrs,
        })
      }
    }

    return { edges }
  },
})

export default bunfigFileEdgeProducer
