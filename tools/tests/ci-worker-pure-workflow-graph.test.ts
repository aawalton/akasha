import { describe, expect, test } from "bun:test"
import {
  isMergedGraphAcyclic,
  topologicallySortWorkflows,
} from "../lib/ci-worker-pure/workflow-graph.ts"
import type { WorkflowConfig } from "../lib/ci-worker-pure/workflow-types.ts"

const wf = (name: string, dependsOn?: readonly string[]): WorkflowConfig => ({
  name,
  ...(dependsOn === undefined ? {} : { dependsOn }),
  config: {},
})

describe("topologicallySortWorkflows", () => {
  test("a dependency comes out before what depends on it", () => {
    const sorted = topologicallySortWorkflows([
      wf("deploy", ["typecheck", "lint"]),
      wf("typecheck"),
      wf("lint"),
    ])
    expect(sorted.map((one) => one.name)).toEqual(["typecheck", "lint", "deploy"])
  })

  test("workflows nothing orders keep their original order", () => {
    const sorted = topologicallySortWorkflows([wf("c"), wf("a"), wf("b")])
    expect(sorted.map((one) => one.name)).toEqual(["c", "a", "b"])
  })

  test("a dependsOn target outside the selection is ignored", () => {
    const sorted = topologicallySortWorkflows([wf("check", ["never-selected"])])
    expect(sorted.map((one) => one.name)).toEqual(["check"])
  })

  test("a cycle throws with the closing edge chain named", () => {
    expect(() =>
      topologicallySortWorkflows([wf("A", ["B"]), wf("B", ["C"]), wf("C", ["A"])])
    ).toThrow(/A -> B -> C -> A/)
  })
})

describe("isMergedGraphAcyclic", () => {
  test("a selection and an absorbed set that do not close a cycle are acyclic", () => {
    expect(
      isMergedGraphAcyclic(
        [wf("cleanup", ["older-aggregator"])],
        [
          {
            workflow: {
              id: "wf-1",
              pipelineId: "older",
              pipelineSeq: 99,
              status: "pending",
              name: "older-aggregator",
            },
            fromPipeline: { id: "older", seq: 99, status: "running", branch: "feature-x" },
            config: { dependsOn: [] },
          },
        ]
      )
    ).toBe(true)
  })

  test("an absorbed workflow depending back on the selection closes a cycle", () => {
    expect(
      isMergedGraphAcyclic(
        [wf("cleanup", ["older-aggregator"])],
        [
          {
            workflow: {
              id: "wf-1",
              pipelineId: "older",
              pipelineSeq: 99,
              status: "pending",
              name: "older-aggregator",
            },
            fromPipeline: { id: "older", seq: 99, status: "running", branch: "feature-x" },
            config: { dependsOn: ["cleanup"] },
          },
        ]
      )
    ).toBe(false)
  })
})
