// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

import { oldGraphGone } from "../../graph-gone.ts"
import type { SourceTree } from "../pipeline/workflow-modules.ts"

export type CheckStepComposition = {
  readonly stepPrefix: string
  readonly defaultImage: string
}
export const CHECK_WORKFLOW_SOURCE = "tools/lib/check-workflow/index.ts"
export const readComposition: (tree: SourceTree) => CheckStepComposition = () =>
  oldGraphGone("readComposition")
