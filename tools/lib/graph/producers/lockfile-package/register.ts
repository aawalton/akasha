import { oldGraphGone } from "../../graph-gone.ts"
import type { Engine } from "../../types.ts"

export const registerLockfilePackageTypes: (engine: Engine) => undefined = () =>
  oldGraphGone("registerLockfilePackageTypes")
