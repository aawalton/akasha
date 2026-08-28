import { oldGraphGone } from "../../graph-gone.ts"
import type { Engine } from "../../types.ts"

export const registerK8sNodeTypes: (engine: Engine) => undefined = () =>
  oldGraphGone("registerK8sNodeTypes")
export const registerK8sSynthEdgeTypes: (engine: Engine) => undefined = () =>
  oldGraphGone("registerK8sSynthEdgeTypes")
