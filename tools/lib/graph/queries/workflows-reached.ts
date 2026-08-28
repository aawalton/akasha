import { oldGraphGone } from "../graph-gone.ts"
import type { Graph, NodeId } from "../types.ts"
import type { PopulationEntry } from "./membership.ts"

export type WorkflowsReachedAsk = {
  readonly changedPaths: readonly string[]
  readonly workflows: readonly WorkflowSeeds[]
}
export type WorkflowsReached = {
  readonly paths: readonly PathVerdict[]
  readonly workflows: readonly WorkflowVerdict[]
}
export type PathVerdict = {
  readonly path: string
  readonly standsAt: StandsAt
}
export type StandsAt = "child" | "parent" | "neither"
export type WorkflowVerdict = {
  readonly name: string
  readonly reached: boolean
  readonly by: ReachedBy
  readonly changedPaths: readonly string[]
}
export type ReachedBy = "watches-everything" | "child" | "parent" | "child+parent" | "nothing"
export type WorkflowSeeds = {
  readonly name: string
  readonly dispatchNodes?: readonly NodeId[]
  readonly dispatchNodeTypes?: readonly PopulationEntry[]
  readonly closurePolicy?: "import-graph"
}
export const workflowsReached: (
  child: Graph,
  parent: Graph | undefined,
  ask: WorkflowsReachedAsk
) => WorkflowsReached = () => oldGraphGone("workflowsReached")
