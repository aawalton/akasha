import { describe, expect, test } from "bun:test"
import {
  branchTier,
  CORPSE_NAMESPACE,
  decideInjectCorpse,
  type InjectCorpseTarget,
  MERGE_QUEUE_STAGING_BRANCH,
  type PendingStepRef,
  selectPendingStep,
  type StepResolution,
} from "../lib/pipeline-decide/decide-inject-corpse.ts"

const COMMIT = "abcdef1234567890abcdef1234567890abcdef12"

const STEP: PendingStepRef = { id: "step-abc", stepName: "check-type-check" }

const SELECTED: StepResolution = { kind: "selected", step: STEP }

function target(branch: string): InjectCorpseTarget {
  return { seq: "14701", branch, commit: COMMIT }
}

function decide(branch: string, stepResolution: StepResolution = SELECTED) {
  return decideInjectCorpse({ target: target(branch), stepResolution })
}

describe("branchTier", () => {
  test("main and the staging lane sit below an ordinary branch", () => {
    expect(branchTier("main")).toBe(0)
    expect(branchTier(MERGE_QUEUE_STAGING_BRANCH)).toBe(1)
    expect(branchTier("project-14701")).toBe(2)
  })
})

describe("decideInjectCorpse", () => {
  test("a live-critical lane is refused whatever step was resolved", () => {
    for (const branch of ["main", MERGE_QUEUE_STAGING_BRANCH]) {
      const found = decide(branch)
      expect(found.kind).toBe("refuse")
      if (found.kind !== "refuse") return
      expect(found.reason).toContain("live-critical")
      expect(found.reason).toContain(branch)
    }
    const noStep = decide("main", { kind: "none" })
    expect(noStep.kind).toBe("refuse")
    if (noStep.kind !== "refuse") return
    expect(noStep.reason).toContain("tier 0")
  })

  test("an ordinary branch injects at the container name the relaunch will use", () => {
    const found = decide("project-14701")
    expect(found).toEqual({
      kind: "inject",
      containerName: "pe-14701-check-type-check-abcdef1",
      stepId: "step-abc",
      stepName: "check-type-check",
      namespace: CORPSE_NAMESPACE,
    })
  })

  test("a step resolution that named nothing to plant in front of is refused", () => {
    expect(decide("project-14701", { kind: "none" }).kind).toBe("refuse")
    const many = decide("project-14701", { kind: "ambiguous", names: ["a", "b", "c"] })
    expect(many.kind).toBe("refuse")
    if (many.kind !== "refuse") return
    expect(many.reason).toContain("3 pending steps")
    expect(many.reason).toContain("--step-name")

    const missed = decide("project-14701", { kind: "not-matched", selector: "--step-name deploy" })
    expect(missed.kind).toBe("refuse")
    if (missed.kind !== "refuse") return
    expect(missed.reason).toContain("--step-name deploy")
  })
})

describe("selectPendingStep", () => {
  const A: PendingStepRef = { id: "id-a", stepName: "check-type-check" }
  const B: PendingStepRef = { id: "id-b", stepName: "check-biome" }

  test("with nothing named, one pending step is the step and several are ambiguous", () => {
    expect(selectPendingStep([A], {})).toEqual({ kind: "selected", step: A })
    expect(selectPendingStep([], {})).toEqual({ kind: "none" })
    expect(selectPendingStep([A, B], {})).toEqual({
      kind: "ambiguous",
      names: ["check-type-check", "check-biome"],
    })
  })

  test("an id names one step, and one that names none says which selector missed", () => {
    expect(selectPendingStep([A, B], { stepId: "id-b" })).toEqual({ kind: "selected", step: B })
    expect(selectPendingStep([A, B], { stepId: "id-z" })).toEqual({
      kind: "not-matched",
      selector: "--step-id id-z",
    })
  })

  test("a name that two steps answer to is ambiguous rather than the first of them", () => {
    expect(selectPendingStep([A, B], { stepName: "check-biome" })).toEqual({
      kind: "selected",
      step: B,
    })
    expect(selectPendingStep([A, B], { stepName: "deploy" })).toEqual({
      kind: "not-matched",
      selector: "--step-name deploy",
    })
    const twice: PendingStepRef = { id: "id-c", stepName: "check-type-check" }
    expect(selectPendingStep([A, twice], { stepName: "check-type-check" }).kind).toBe("ambiguous")
  })
})
