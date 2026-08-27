import type { Engine } from "../../types.ts"
import {
  TUNNEL_CONFIG_RECIPE_INPUT_EDGE_TYPE,
  TUNNEL_CONFIG_RECIPE_NODE_TYPE,
  TUNNEL_ROUTE_NODE_TYPE,
} from "./types.ts"

export const registerTunnelConfigRecipeTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: TUNNEL_CONFIG_RECIPE_NODE_TYPE })
  engine.registerNodeType({ name: TUNNEL_ROUTE_NODE_TYPE })
  engine.registerEdgeType({
    name: TUNNEL_CONFIG_RECIPE_INPUT_EDGE_TYPE,
    from: TUNNEL_CONFIG_RECIPE_NODE_TYPE,
    to: TUNNEL_ROUTE_NODE_TYPE,
  })
}
