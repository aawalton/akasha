// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

import { oldGraphGone } from "../../graph-gone.ts"
import type { NodeInit } from "../../types.ts"
import type { CheckStepComposition } from "./composition.ts"
import type { ClusterCheckAttrs } from "./types.ts"

export const buildClusterCheckNodes: (
  checks: readonly ClusterCheckAttrs[],
  composition: CheckStepComposition
) => readonly NodeInit[] = () => oldGraphGone("buildClusterCheckNodes")
