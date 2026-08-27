import { describe, expect, test } from "bun:test"
import { createGraph } from "../lib/graph/graph.ts"
import type { Edge, Graph, Node } from "../lib/graph/types.ts"
import { workflowsReached } from "../lib/graph/queries/workflows-reached.ts"

const CODE_REPO = "code"
const PACKAGE_ID = `package:${CODE_REPO}:@alanwalton/daily-tracking`
const DELETED = "packages/alanwalton/daily-tracking/apps.workflow.ts"
const KEPT = "packages/alanwalton/daily-tracking/src/totals.ts"

const packageNode: Node = {
  id: PACKAGE_ID,
  type: "package",
  repo: CODE_REPO,
  key: "@alanwalton/daily-tracking",
  attrs: {},
  derived: {},
}

const fileNode = (path: string): Node => ({
  id: `ts-file:${CODE_REPO}:${path}`,
  type: "ts-file",
  repo: CODE_REPO,
  key: path,
  attrs: { path },
  derived: {},
})

const containsEdge = (path: string): Edge => ({
  type: "pkg-contains-file",
  from: PACKAGE_ID,
  to: `ts-file:code:${path}`,
  attrs: {},
  derived: {},
})

const atParent: Graph = createGraph(
  [packageNode, fileNode(DELETED), fileNode(KEPT)],
  [containsEdge(DELETED), containsEdge(KEPT)]
)

const atChild: Graph = createGraph([packageNode, fileNode(KEPT)], [containsEdge(KEPT)])

const watcher = { name: "alanwalton-daily-tracking", dispatchNodes: [PACKAGE_ID] }

describe("a deleted path is judged at the parent", () => {
  test("without a parent the deletion reaches nothing — this is the fault being fixed", () => {
    const answer = workflowsReached(atChild, undefined, {
      changedPaths: [DELETED],
      workflows: [watcher],
    })
    expect(answer.paths).toEqual([{ path: DELETED, standsAt: "neither" }])
    expect(answer.workflows[0]?.reached).toBe(false)
    expect(answer.workflows[0]?.by).toBe("nothing")
  })

  test("with the parent the same deletion reaches the workflow that covered it", () => {
    const answer = workflowsReached(atChild, atParent, {
      changedPaths: [DELETED],
      workflows: [watcher],
    })
    expect(answer.paths).toEqual([{ path: DELETED, standsAt: "parent" }])
    expect(answer.workflows[0]?.reached).toBe(true)
    expect(answer.workflows[0]?.by).toBe("parent")
    expect(answer.workflows[0]?.changedPaths).toEqual([DELETED])
  })

  test("a workflow whose closure never covered the deleted path stays unreached", () => {
    const other = { name: "elsewhere", dispatchNodes: ["package:code:@elsewhere/thing"] }
    const answer = workflowsReached(atChild, atParent, {
      changedPaths: [DELETED],
      workflows: [other],
    })
    expect(answer.workflows[0]?.reached).toBe(false)
  })
})

describe("a path standing at the child is judged there", () => {
  test("a path present at both is judged at the child", () => {
    const answer = workflowsReached(atChild, atParent, {
      changedPaths: [KEPT],
      workflows: [watcher],
    })
    expect(answer.paths).toEqual([{ path: KEPT, standsAt: "child" }])
    expect(answer.workflows[0]?.by).toBe("child")
  })

  test("a deletion and an edit together name both rules", () => {
    const answer = workflowsReached(atChild, atParent, {
      changedPaths: [DELETED, KEPT],
      workflows: [watcher],
    })
    expect(answer.paths).toEqual([
      { path: DELETED, standsAt: "parent" },
      { path: KEPT, standsAt: "child" },
    ])
    expect(answer.workflows[0]?.by).toBe("child+parent")
    expect(answer.workflows[0]?.changedPaths).toEqual([KEPT, DELETED])
  })

  test("a path standing at neither commit is judged nowhere", () => {
    const answer = workflowsReached(atChild, atParent, {
      changedPaths: ["packages/nothing/at-all.ts"],
      workflows: [watcher],
    })
    expect(answer.paths).toEqual([{ path: "packages/nothing/at-all.ts", standsAt: "neither" }])
    expect(answer.workflows[0]?.reached).toBe(false)
  })
})

describe("a workflow naming no seed watches everything", () => {
  test("it is reached by a deletion, and carries every changed path", () => {
    const answer = workflowsReached(atChild, atParent, {
      changedPaths: [DELETED],
      workflows: [{ name: "everything" }],
    })
    expect(answer.workflows[0]?.reached).toBe(true)
    expect(answer.workflows[0]?.by).toBe("watches-everything")
    expect(answer.workflows[0]?.changedPaths).toEqual([DELETED])
  })
})

describe("one ask carries every workflow of a pipeline", () => {
  test("each workflow gets its own verdict from the one pair of snapshots", () => {
    const answer = workflowsReached(atChild, atParent, {
      changedPaths: [DELETED, KEPT],
      workflows: [
        watcher,
        { name: "everything" },
        { name: "elsewhere", dispatchNodes: ["package:code:@elsewhere/thing"] },
      ],
    })
    expect(answer.workflows.map((one) => one.name)).toEqual([
      "alanwalton-daily-tracking",
      "everything",
      "elsewhere",
    ])
    expect(answer.workflows.map((one) => one.reached)).toEqual([true, true, false])
  })
})
