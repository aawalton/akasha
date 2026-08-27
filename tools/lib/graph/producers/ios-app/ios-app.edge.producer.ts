import { z } from "zod"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit, Graph } from "../../types.ts"
import { FILE_NODE_TYPES } from "../file/node-types.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../package/types.ts"
import { discoverIosAppSources, IOS_APP_PAGE_REPO, IOS_APP_SUBJECT_REPO } from "./discover.ts"
import {
  IOS_APP_NATIVE_SHELL_EDGE_TYPE,
  IOS_APP_NODE_TYPE,
  IOS_APP_SPA_SOURCE_EDGE_TYPE,
  type IosAppNativeShellAttrs,
  type IosAppSpaSourceAttrs,
} from "./types.ts"

const NATIVE_SHELL_ATTRS: IosAppNativeShellAttrs = {}

const SPA_SOURCE_ATTRS: IosAppSpaSourceAttrs = {}

const FilePathAttrsSchema = z.object({ path: z.string() }).passthrough()

type FileHolding = {
  readonly id: string
  readonly path: string
}

const packagesByPath = (graph: Graph): ReadonlyMap<string, string> => {
  const byPath = new Map<string, string>()
  for (const node of graph.nodes(PACKAGE_NODE_TYPE)) {
    const attrs = PackageAttrsSchema.parse(node.attrs)
    if (attrs.path === "") continue
    byPath.set(attrs.path, node.id)
  }
  return byPath
}

const filesHeld = (graph: Graph): readonly FileHolding[] => {
  const held: FileHolding[] = []
  for (const node of graph.nodes(FILE_NODE_TYPES)) {
    const parsed = FilePathAttrsSchema.safeParse(node.attrs)
    if (!parsed.success) continue
    held.push({ id: node.id, path: parsed.data.path })
  }
  return held
}

const filesUnder = (files: readonly FileHolding[], dir: string): readonly string[] =>
  files.filter((one) => one.path.startsWith(`${dir}/`)).map((one) => one.id)

const builtFrom = (
  byPath: ReadonlyMap<string, string>,
  files: readonly FileHolding[],
  stated: string | null
): readonly string[] => {
  if (stated === null) return []
  const held = byPath.get(stated)
  if (held !== undefined) return [held]
  const own = files.find((one) => one.path === stated)
  return own === undefined ? filesUnder(files, stated) : [own.id]
}

export const iosAppEdgeProducer = defineEdgeProducer({
  name: "ios-app-edge",
  edgeTypes: [IOS_APP_NATIVE_SHELL_EDGE_TYPE, IOS_APP_SPA_SOURCE_EDGE_TYPE],
  dependsOn: ["ios-app", "package", "file"],
  build: (ctx, graph) => {
    const byPath = packagesByPath(graph)
    const files = filesHeld(graph)
    const edges: EdgeInit[] = []
    for (const app of discoverIosAppSources(ctx, IOS_APP_PAGE_REPO)) {
      const from = nodeKey({ type: IOS_APP_NODE_TYPE, repo: IOS_APP_SUBJECT_REPO, key: app.name })
      const built = [
        app.nativeShellRepoPath,
        app.capacitorConfigRepoPath,
        app.sharedWidgetRepoPath,
        app.ownWidgetRepoPath,
        app.seamScript,
        app.simBuildScript,
        app.entitlementsRepoPath,
        app.iconRepoPath,
        app.wwwStageScript,
        app.webDirRepoPath,
      ].flatMap((stated) => builtFrom(byPath, files, stated))
      for (const to of built) {
        edges.push({
          type: IOS_APP_NATIVE_SHELL_EDGE_TYPE,
          from,
          to,
          attrs: NATIVE_SHELL_ATTRS,
        })
      }
      const spa = app.spaSourceRepoPath === null ? undefined : byPath.get(app.spaSourceRepoPath)
      if (spa !== undefined) {
        edges.push({
          type: IOS_APP_SPA_SOURCE_EDGE_TYPE,
          from,
          to: spa,
          attrs: SPA_SOURCE_ATTRS,
        })
      }
    }
    return { edges }
  },
})

export default iosAppEdgeProducer
