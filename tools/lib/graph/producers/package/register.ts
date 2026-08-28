import { oldGraphGone } from "../../graph-gone.ts"
import type { Engine } from "../../types.ts"

export const registerPackageTypes: (engine: Engine) => undefined = () =>
  oldGraphGone("registerPackageTypes")
