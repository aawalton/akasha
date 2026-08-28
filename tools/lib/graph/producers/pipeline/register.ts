import { oldGraphGone } from "../../graph-gone.ts"
import type { Engine } from "../../types.ts"

export const registerPipelineTypes: (engine: Engine) => undefined = () =>
  oldGraphGone("registerPipelineTypes")
