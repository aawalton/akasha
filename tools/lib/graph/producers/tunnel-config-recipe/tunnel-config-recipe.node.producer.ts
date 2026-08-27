import { defineNodeProducer } from "../../define-node-producer.ts"
import type { NodeInit } from "../../types.ts"
import { discoverTunnelRouteFiles, holdsCloudflared } from "./discover.ts"
import {
  TUNNEL_CONFIG_RECIPE_KEY,
  TUNNEL_CONFIG_RECIPE_NODE_TYPE,
  TUNNEL_ROUTE_NODE_TYPE,
  type TunnelConfigRecipeAttrs,
  type TunnelRouteAttrs,
} from "./types.ts"

export const tunnelConfigRecipeNodeProducer = defineNodeProducer({
  name: "tunnel-config-recipe",
  nodeTypes: [TUNNEL_CONFIG_RECIPE_NODE_TYPE, TUNNEL_ROUTE_NODE_TYPE],
  build: (ctx) => {
    const nodes: NodeInit[] = []
    for (const repo of ctx.repoRoots.keys()) {
      if (!holdsCloudflared(ctx, repo)) continue
      const recipeAttrs: TunnelConfigRecipeAttrs = { name: TUNNEL_CONFIG_RECIPE_KEY }
      const recipe: NodeInit<"tunnel-config-recipe", TunnelConfigRecipeAttrs> = {
        type: TUNNEL_CONFIG_RECIPE_NODE_TYPE,
        repo,
        key: TUNNEL_CONFIG_RECIPE_KEY,
        attrs: recipeAttrs,
      }
      nodes.push(recipe)
      for (const path of discoverTunnelRouteFiles(ctx, repo)) {
        const attrs: TunnelRouteAttrs = { path }
        const route: NodeInit<"tunnel-route", TunnelRouteAttrs> = {
          type: TUNNEL_ROUTE_NODE_TYPE,
          repo,
          key: path,
          attrs,
        }
        nodes.push(route)
      }
    }
    return { nodes }
  },
})

export default tunnelConfigRecipeNodeProducer
