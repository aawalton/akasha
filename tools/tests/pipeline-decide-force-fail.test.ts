import { describe, expect, test } from "bun:test"
import {
  decideForceFail,
  type ForceFailOptions,
  type ResolvedStep,
} from "../lib/pipeline-decide/decide-force-fail.ts"

const NOW = "2026-07-01T03:00:00.000Z"

const STEP_SEQ = "4821"

const OPTS: ForceFailOptions = { exitCode: 137, failureReason: "PodDeleted", completedAt: NOW }

function step(status: string, exitCode: number | null): ResolvedStep {
  return { id: STEP_SEQ, status, exitCode }
}

describe("decideForceFail", () => {
  test("a wedged running step becomes one guarded write that lands every terminal field at once", () => {
    const decision = decideForceFail(step("running", null), OPTS)
    expect(decision).toEqual({
      kind: "patch",
      patch: {
        pageTypeSlug: "step",
        id: STEP_SEQ,
        ifStatus: "running",
        set: {
          status: "failed",
          exitCode: 137,
          failureReason: "PodDeleted",
          completedAt: NOW,
        },
      },
    })
  })

  test("a launching step is forcible too, and guards on the status it was found in", () => {
    const decision = decideForceFail(step("launching", null), OPTS)
    expect(decision.kind).toBe("patch")
    if (decision.kind !== "patch") return
    expect(decision.patch.ifStatus).toBe("launching")
  })

  test("what the caller asked to write is what is written", () => {
    const decision = decideForceFail(step("running", null), {
      exitCode: 143,
      failureReason: "OperatorCanceled",
      completedAt: NOW,
    })
    expect(decision.kind).toBe("patch")
    if (decision.kind !== "patch") return
    expect(decision.patch.set.exitCode).toBe(143)
    expect(decision.patch.set.failureReason).toBe("OperatorCanceled")
  })

  test("a step already terminal is left where it stands", () => {
    expect(decideForceFail(step("failed", 1), OPTS)).toEqual({
      kind: "already-terminal",
      status: "failed",
    })
    expect(decideForceFail(step("passed", 0), OPTS).kind).toBe("already-terminal")
    expect(decideForceFail(step("canceled", 137), OPTS).kind).toBe("already-terminal")
  })

  test("a step that has not launched is refused, since nothing about it is wedged", () => {
    expect(decideForceFail(step("pending", null), OPTS).kind).toBe("refuse")
    expect(decideForceFail(step("dispatching", null), OPTS).kind).toBe("refuse")
  })

  test("a running step already reporting an exit code is refused rather than overwritten", () => {
    const decision = decideForceFail(step("running", 0), OPTS)
    expect(decision.kind).toBe("refuse")
    if (decision.kind !== "refuse") return
    expect(decision.reason).toContain("0")
  })
})
