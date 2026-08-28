import { oldGraphGone } from "../../graph-gone.ts"
import type { Engine } from "../../types.ts"

export const registerTunnelConfigRecipeTypes: (engine: Engine) => undefined = () =>
  oldGraphGone("registerTunnelConfigRecipeTypes")
