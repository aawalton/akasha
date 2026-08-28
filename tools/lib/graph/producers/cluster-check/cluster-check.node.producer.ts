import { oldGraphGone } from "../../graph-gone.ts"
import type { NodeInit } from "../../types.ts"
import type { CheckStepComposition } from "./composition.ts"
import type { ClusterCheckAttrs } from "./types.ts"

export const buildClusterCheckNodes: (
  checks: readonly ClusterCheckAttrs[],
  composition: CheckStepComposition
) => readonly NodeInit[] = () => oldGraphGone("buildClusterCheckNodes")
