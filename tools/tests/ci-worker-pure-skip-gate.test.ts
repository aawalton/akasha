import { describe, expect, test } from "bun:test"
import {
  shouldSkipForIncrementalAndPrev,
  survivorsAfterDependencyProtection,
} from "../lib/ci-worker-pure/incremental-skip-gate.ts"
import type { WorkflowStatus } from "../lib/ci-worker-pure/ci-status-vocabulary"
import { codeId, stepGraph } from "./ci-worker-pure-arm.ts"

const base = {
  workflowName: "check",
  dispatchNodes: [codeId("package", "@foo")],
  prevWorkflowStatuses: { check: "passed" } as Readonly<Record<string, WorkflowStatus>>,
  incrementalChangedFiles: ["packages/bar/y.ts"],
  graph: stepGraph(),
}

describe("shouldSkipForIncrementalAndPrev", () => {
  test("a predecessor that ran only some checks is refused as credit", () => {
    expect(
      shouldSkipForIncrementalAndPrev({ ...base, prevOnlyCheckNames: ["check-service-typecheck"] })
    ).toBe(false)
  })

  test("an empty but present onlyCheckNames is still a partial run", () => {
    expect(shouldSkipForIncrementalAndPrev({ ...base, prevOnlyCheckNames: [] })).toBe(false)
  })

  test("a full-run predecessor whose closure nothing touched is creditable", () => {
    expect(shouldSkipForIncrementalAndPrev({ ...base, prevOnlyCheckNames: null })).toBe(true)
  })

  test("a full-run predecessor whose closure is touched re-runs", () => {
    expect(
      shouldSkipForIncrementalAndPrev({
        ...base,
        incrementalChangedFiles: ["packages/foo/x.ts"],
        prevOnlyCheckNames: null,
      })
    ).toBe(false)
  })

  test("a predecessor that did not pass re-runs whatever its provenance", () => {
    expect(
      shouldSkipForIncrementalAndPrev({
        ...base,
        prevWorkflowStatuses: { check: "failed" },
        prevOnlyCheckNames: null,
      })
    ).toBe(false)
  })
})

describe("survivorsAfterDependencyProtection", () => {
  test("a skip-eligible dependency of a survivor is re-included", () => {
    const { survivingNames, skippedNames } = survivorsAfterDependencyProtection({
      entries: [
        { name: "prep", dependsOn: [], skipEligible: true },
        { name: "check", dependsOn: ["prep"], skipEligible: false },
      ],
    })
    expect([...survivingNames].sort()).toEqual(["check", "prep"])
    expect(skippedNames).toEqual([])
  })

  test("protection carries along a dependency chain", () => {
    const { survivingNames, skippedNames } = survivorsAfterDependencyProtection({
      entries: [
        { name: "a", dependsOn: [], skipEligible: true },
        { name: "b", dependsOn: ["a"], skipEligible: true },
        { name: "c", dependsOn: ["b"], skipEligible: false },
      ],
    })
    expect([...survivingNames].sort()).toEqual(["a", "b", "c"])
    expect(skippedNames).toEqual([])
  })

  test("a skip-eligible workflow with no surviving dependent is dropped", () => {
    const { survivingNames, skippedNames } = survivorsAfterDependencyProtection({
      entries: [
        { name: "prep", dependsOn: [], skipEligible: true },
        { name: "check", dependsOn: ["prep"], skipEligible: true },
      ],
    })
    expect([...survivingNames]).toEqual([])
    expect(skippedNames).toEqual(["prep", "check"])
  })

  test("a dependsOn target that is no entry is ignored", () => {
    const { survivingNames, skippedNames } = survivorsAfterDependencyProtection({
      entries: [{ name: "check", dependsOn: ["foundation-not-selected"], skipEligible: false }],
    })
    expect([...survivingNames]).toEqual(["check"])
    expect(skippedNames).toEqual([])
  })

  test("a cycle among skip-eligible workflows terminates and stays dropped", () => {
    const { survivingNames, skippedNames } = survivorsAfterDependencyProtection({
      entries: [
        { name: "x", dependsOn: ["y"], skipEligible: true },
        { name: "y", dependsOn: ["x"], skipEligible: true },
      ],
    })
    expect([...survivingNames]).toEqual([])
    expect(skippedNames).toEqual(["x", "y"])
  })

  test("skippedNames keeps the original entry order", () => {
    const { skippedNames } = survivorsAfterDependencyProtection({
      entries: [
        { name: "first", dependsOn: [], skipEligible: true },
        { name: "second", dependsOn: [], skipEligible: false },
        { name: "third", dependsOn: [], skipEligible: true },
      ],
    })
    expect(skippedNames).toEqual(["first", "third"])
  })
})
