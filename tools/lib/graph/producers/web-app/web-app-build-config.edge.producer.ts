import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, NodeId } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { PACKAGE_NODE_TYPE, PackageAttrsSchema } from "../package/types.ts"
import { discoverWebAppBuildConfigs } from "./build-config.ts"
import { WEB_APP_BUILD_CONFIG_EDGE_TYPE, type WebAppBuildConfigAttrs } from "./types.ts"

const FILE_NODE_SUFFIX = "-file"

export const webAppBuildConfigEdgeProducer = defineEdgeProducer({
  name: "web-app-build-config",
  edgeTypes: [WEB_APP_BUILD_CONFIG_EDGE_TYPE],
  dependsOn: ["package", "file"],
  build: (ctx, upstream) => {
    const owners: { readonly path: string; readonly id: NodeId }[] = []
    for (const node of upstream.nodes(PACKAGE_NODE_TYPE)) {
      if (node.repo !== CODE_REPO) continue
      const attrs = PackageAttrsSchema.parse(node.attrs)
      if (attrs.path === "") continue
      owners.push({ path: attrs.path, id: node.id })
    }
    owners.sort((a, b) => b.path.length - a.path.length)

    const edges: EdgeInit[] = []
    const attrs: WebAppBuildConfigAttrs = {}
    const seen = new Set<string>()

    for (const path of discoverWebAppBuildConfigs(ctx)) {
      const from = owners.find((one) => path.startsWith(`${one.path}/`))?.id
      if (from === undefined) continue
      const to = upstream.nodesByKey(path, CODE_REPO).find((one) => one.type.endsWith(FILE_NODE_SUFFIX))?.id
      if (to === undefined) continue
      const at = `${from} ${to}`
      if (seen.has(at)) continue
      seen.add(at)
      edges.push({ type: WEB_APP_BUILD_CONFIG_EDGE_TYPE, from, to, attrs })
    }

    return { edges }
  },
})

export default webAppBuildConfigEdgeProducer
