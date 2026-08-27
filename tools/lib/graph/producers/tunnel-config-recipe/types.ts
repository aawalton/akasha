import { z } from "zod"

export type TunnelConfigRecipeNodeType = "tunnel-config-recipe"
export const TUNNEL_CONFIG_RECIPE_NODE_TYPE: TunnelConfigRecipeNodeType = "tunnel-config-recipe"

export type TunnelRouteNodeType = "tunnel-route"
export const TUNNEL_ROUTE_NODE_TYPE: TunnelRouteNodeType = "tunnel-route"

export const TUNNEL_CONFIG_RECIPE_KEY = "cloudflared"

export type TunnelConfigRecipeAttrs = {
  readonly name: string
}

export type TunnelRouteAttrs = {
  readonly path: string
}

export type TunnelConfigRecipeInputEdgeType = "tunnel-config-recipe-input"
export const TUNNEL_CONFIG_RECIPE_INPUT_EDGE_TYPE: TunnelConfigRecipeInputEdgeType =
  "tunnel-config-recipe-input"

export type TunnelConfigRecipeInputAttrs = Record<string, never>

export const TunnelRouteAttrsSchema = z
  .object({
    path: z.string().min(1),
  })
  .passthrough()
