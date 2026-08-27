import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { JSON_FILE_NODE_TYPE } from "../file/json-file/types.ts"
import { SH_FILE_NODE_TYPE } from "../file/sh-file/types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { YAML_FILE_NODE_TYPE, YML_FILE_NODE_TYPE } from "../file/yaml-file/types.ts"
import {
  discoverCloudflaredPackageInputs,
  discoverDeployLibShFiles,
  holdsCloudflared,
  TUNNEL_CONFIG_RECIPE_BOOTSTRAP_NODES_JSON,
  TUNNEL_CONFIG_RECIPE_GENERATOR_TS,
} from "./discover.ts"
import {
  TUNNEL_CONFIG_RECIPE_INPUT_EDGE_TYPE,
  TUNNEL_CONFIG_RECIPE_KEY,
  TUNNEL_CONFIG_RECIPE_NODE_TYPE,
  TUNNEL_ROUTE_NODE_TYPE,
  type TunnelConfigRecipeInputAttrs,
  TunnelRouteAttrsSchema,
} from "./types.ts"

export const tunnelConfigRecipeEdgeProducer = defineEdgeProducer({
  name: "tunnel-config-recipe-edge",
  edgeTypes: [TUNNEL_CONFIG_RECIPE_INPUT_EDGE_TYPE],
  dependsOn: ["tunnel-config-recipe", "file"],
  build: (ctx, upstream) => {
    const edges: EdgeInit[] = []
    const emptyAttrs = (): TunnelConfigRecipeInputAttrs => ({})

    for (const node of upstream.nodes(TUNNEL_ROUTE_NODE_TYPE)) {
      TunnelRouteAttrsSchema.parse(node.attrs)
      edges.push({
        type: TUNNEL_CONFIG_RECIPE_INPUT_EDGE_TYPE,
        from: nodeKey({
          type: TUNNEL_CONFIG_RECIPE_NODE_TYPE,
          repo: node.repo,
          key: TUNNEL_CONFIG_RECIPE_KEY,
        }),
        to: node.id,
        attrs: emptyAttrs(),
      })
    }

    for (const repo of ctx.repoRoots.keys()) {
      if (!holdsCloudflared(ctx, repo)) continue
      const from = nodeKey({
        type: TUNNEL_CONFIG_RECIPE_NODE_TYPE,
        repo,
        key: TUNNEL_CONFIG_RECIPE_KEY,
      })
      const reaches = (type: string, key: string): undefined => {
        edges.push({
          type: TUNNEL_CONFIG_RECIPE_INPUT_EDGE_TYPE,
          from,
          to: nodeKey({ type, repo, key }),
          attrs: emptyAttrs(),
        })
      }
      const inputs = discoverCloudflaredPackageInputs(ctx, repo)
      for (const path of inputs.tsFiles) reaches(TS_FILE_NODE_TYPE, path)
      for (const path of inputs.yamlFiles) {
        reaches(path.endsWith(".yml") ? YML_FILE_NODE_TYPE : YAML_FILE_NODE_TYPE, path)
      }
      for (const path of inputs.jsonFiles) reaches(JSON_FILE_NODE_TYPE, path)
      for (const path of inputs.shFiles) reaches(SH_FILE_NODE_TYPE, path)
      reaches(TS_FILE_NODE_TYPE, TUNNEL_CONFIG_RECIPE_GENERATOR_TS)
      reaches(JSON_FILE_NODE_TYPE, TUNNEL_CONFIG_RECIPE_BOOTSTRAP_NODES_JSON)
      for (const path of discoverDeployLibShFiles(ctx, repo)) reaches(SH_FILE_NODE_TYPE, path)
    }

    return { edges }
  },
})

export default tunnelConfigRecipeEdgeProducer
