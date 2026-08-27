import type { ClosureSeeds, PopulationEntry } from "../graph/queries/membership.ts"
import type { Graph, NodeId } from "../graph/types.ts"
import { closureIntersectsChangedFiles } from "./closure-reach.ts"
import type { WorkflowStatus } from "./ci-status-vocabulary"

export function shouldSkipForIncrementalAndPrev(input: {
  readonly workflowName: string
  readonly dispatchNodes?: readonly NodeId[]
  readonly dispatchNodeTypes?: readonly PopulationEntry[]
  readonly prevWorkflowStatuses: Readonly<Record<string, WorkflowStatus>>
  readonly prevOnlyCheckNames: readonly string[] | null
  readonly incrementalChangedFiles: readonly string[]
  readonly graph: Graph
}): boolean {
  if (input.prevOnlyCheckNames !== null) return false
  const prev = input.prevWorkflowStatuses[input.workflowName]
  if (prev !== "passed") return false
  const seeds: {
    nodes?: readonly NodeId[]
    nodeTypes?: readonly PopulationEntry[]
  } = {}
  if (input.dispatchNodes !== undefined && input.dispatchNodes.length > 0) {
    seeds.nodes = input.dispatchNodes
  }
  if (input.dispatchNodeTypes !== undefined && input.dispatchNodeTypes.length > 0) {
    seeds.nodeTypes = input.dispatchNodeTypes
  }
  return !closureIntersectsChangedFiles(
    input.graph,
    seeds satisfies ClosureSeeds,
    input.incrementalChangedFiles
  )
}

export function survivorsAfterDependencyProtection(input: {
  readonly entries: readonly {
    readonly name: string
    readonly dependsOn: readonly string[]
    readonly skipEligible: boolean
  }[]
}): { readonly survivingNames: ReadonlySet<string>; readonly skippedNames: readonly string[] } {
  const names = new Set(input.entries.map((e) => e.name))
  const depsByName = new Map<string, readonly string[]>()
  for (const e of input.entries) {
    depsByName.set(
      e.name,
      e.dependsOn.filter((d) => names.has(d))
    )
  }
  const surviving = new Set<string>()
  const queue: string[] = []
  for (const e of input.entries) {
    if (!e.skipEligible) {
      surviving.add(e.name)
      queue.push(e.name)
    }
  }
  while (queue.length > 0) {
    const next = queue.pop()
    if (next === undefined) continue
    for (const dep of depsByName.get(next) ?? []) {
      if (!surviving.has(dep)) {
        surviving.add(dep)
        queue.push(dep)
      }
    }
  }
  const skippedNames = input.entries.filter((e) => !surviving.has(e.name)).map((e) => e.name)
  return { survivingNames: surviving, skippedNames }
}
