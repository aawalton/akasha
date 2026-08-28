import { oldGraphGone } from "../../graph-gone.ts"
import type { Engine } from "../../types.ts"

export const registerFileNodeTypes: (engine: Engine) => undefined = () =>
  oldGraphGone("registerFileNodeTypes")
