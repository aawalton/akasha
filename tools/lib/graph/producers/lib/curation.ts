import { oldGraphGone } from "../../graph-gone.ts"
import type { BuildContext } from "../../types.ts"

export const curatedWorkspaces: (ctx: BuildContext) => Readonly<Record<string, unknown>> | null =
  () => oldGraphGone("curatedWorkspaces")
