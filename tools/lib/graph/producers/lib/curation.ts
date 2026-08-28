// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

import { oldGraphGone } from "../../graph-gone.ts"
import type { BuildContext } from "../../types.ts"

export const curatedWorkspaces: (ctx: BuildContext) => Readonly<Record<string, unknown>> | null =
  () => oldGraphGone("curatedWorkspaces")
