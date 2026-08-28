import { oldGraphGone } from "../../graph-gone.ts"
import type { Engine } from "../../types.ts"

export const registerDockerfileRecipeTypes: (engine: Engine) => undefined = () =>
  oldGraphGone("registerDockerfileRecipeTypes")
