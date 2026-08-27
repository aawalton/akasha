import type { Graph, NodeId } from "../types.ts"
import {
  type ClosureMembership,
  type ClosureSeeds,
  membershipCoversPath,
  nodesAtKey,
  type PopulationEntry,
  resolveClosureMembership,
} from "./membership.ts"

export type WorkflowSeeds = {
  readonly name: string
  readonly dispatchNodes?: readonly NodeId[]
  readonly dispatchNodeTypes?: readonly PopulationEntry[]
  readonly closurePolicy?: "import-graph"
}

const CODE_REPO = "code"

export type StandsAt = "child" | "parent" | "neither"

export type PathVerdict = {
  readonly path: string
  readonly standsAt: StandsAt
}

export type ReachedBy = "watches-everything" | "child" | "parent" | "child+parent" | "nothing"

export type WorkflowVerdict = {
  readonly name: string
  readonly reached: boolean
  readonly by: ReachedBy
  readonly changedPaths: readonly string[]
}

export type WorkflowsReachedAsk = {
  readonly changedPaths: readonly string[]
  readonly workflows: readonly WorkflowSeeds[]
}

export type WorkflowsReached = {
  readonly paths: readonly PathVerdict[]
  readonly workflows: readonly WorkflowVerdict[]
}

const seedsOf = (one: WorkflowSeeds): ClosureSeeds => ({
  ...(one.dispatchNodes === undefined ? {} : { nodes: one.dispatchNodes }),
  ...(one.dispatchNodeTypes === undefined ? {} : { nodeTypes: one.dispatchNodeTypes }),
  ...(one.closurePolicy === undefined ? {} : { closurePolicy: one.closurePolicy }),
})

const standingOf = (
  child: Graph,
  parent: Graph | undefined,
  changedPaths: readonly string[]
): readonly PathVerdict[] =>
  changedPaths.map((path) => {
    if (nodesAtKey(child, path, CODE_REPO).length > 0) return { path, standsAt: "child" as const }
    if (parent !== undefined && nodesAtKey(parent, path, CODE_REPO).length > 0) {
      return { path, standsAt: "parent" as const }
    }
    return { path, standsAt: "neither" as const }
  })

const byOf = (fromChild: number, fromParent: number): ReachedBy => {
  if (fromChild > 0 && fromParent > 0) return "child+parent"
  if (fromChild > 0) return "child"
  if (fromParent > 0) return "parent"
  return "nothing"
}

const verdictOf = (
  child: Graph,
  parent: Graph | undefined,
  standing: readonly PathVerdict[],
  everyPath: readonly string[],
  one: WorkflowSeeds
): WorkflowVerdict => {
  const seeds = seedsOf(one)
  const atChild: ClosureMembership = resolveClosureMembership(child, seeds)
  if (atChild.kind === "all") {
    return { name: one.name, reached: true, by: "watches-everything", changedPaths: everyPath }
  }
  const atParent = parent === undefined ? undefined : resolveClosureMembership(parent, seeds)
  if (atParent !== undefined && atParent.kind === "all") {
    return { name: one.name, reached: true, by: "watches-everything", changedPaths: everyPath }
  }

  const fromChild = standing
    .filter((held) => held.standsAt === "child")
    .filter((held) => membershipCoversPath(child, atChild, held.path, CODE_REPO))
    .map((held) => held.path)
  const fromParent =
    parent === undefined || atParent === undefined
      ? []
      : standing
          .filter((held) => held.standsAt === "parent")
          .filter((held) => membershipCoversPath(parent, atParent, held.path, CODE_REPO))
          .map((held) => held.path)

  const changedPaths = [...fromChild, ...fromParent]
  return {
    name: one.name,
    reached: changedPaths.length > 0,
    by: byOf(fromChild.length, fromParent.length),
    changedPaths,
  }
}

export const workflowsReached = (
  child: Graph,
  parent: Graph | undefined,
  ask: WorkflowsReachedAsk
): WorkflowsReached => {
  const standing = standingOf(child, parent, ask.changedPaths)
  return {
    paths: standing,
    workflows: ask.workflows.map((one) =>
      verdictOf(child, parent, standing, ask.changedPaths, one)
    ),
  }
}
