import { describe, expect, it } from "bun:test"

import {
  assembleInnerReport,
  BENCHMARK_STEP_CONCURRENCY,
  computeBenchmarkExit,
  createSemaphore,
  phaseRepoRoot,
} from "./run-core.ts"
import type { StepTiming } from "./report-types.ts"

function timing(over: Partial<StepTiming> & Pick<StepTiming, "name">): StepTiming {
  return {
    phase: "check",
    durationMs: 1,
    exitCode: 0,
    image: "oven/bun:1.3.14",
    skipped: false,
    ...over,
  }
}

describe("createSemaphore", () => {
  it("never lets more than `limit` bodies run at once and completes them all", async () => {
    const limit = 4
    const sem = createSemaphore(limit)
    let active = 0
    let peak = 0
    let done = 0

    await Promise.all(
      Array.from({ length: 20 }, () =>
        sem.run(async () => {
          active += 1
          peak = Math.max(peak, active)
          await new Promise((r) => setTimeout(r, 2))
          active -= 1
          done += 1
        })
      )
    )

    expect(peak).toBeLessThanOrEqual(limit)
    expect(done).toBe(20)
  })

  it("releases the permit even when the body throws", async () => {
    const sem = createSemaphore(1)
    await expect(sem.run(async () => Promise.reject(new Error("boom")))).rejects.toThrow("boom")
    await expect(sem.run(async () => 42)).resolves.toBe(42)
  })

  it("coerces a non-positive limit to 1 rather than deadlocking", async () => {
    const sem = createSemaphore(0)
    await expect(sem.run(async () => "ok")).resolves.toBe("ok")
  })
})

describe("phaseRepoRoot", () => {
  it("cold-stage runs against the untimed prelude clone (checkout not built yet)", () => {
    expect(phaseRepoRoot("cold-stage", "deadbeef", "/prelude")).toBe("/prelude")
  })

  it("warm-prep + check run against the RAW /ci-storage checkout the cold-stage built", () => {
    expect(phaseRepoRoot("warm-prep", "deadbeef", "/prelude")).toBe(
      "/ci-storage/checkouts/deadbeef"
    )
    expect(phaseRepoRoot("check", "deadbeef", "/prelude")).toBe("/ci-storage/checkouts/deadbeef")
  })
})

describe("computeBenchmarkExit", () => {
  it("is 0 when no preparation phase failed (a measured run, even a red tree)", () => {
    expect(computeBenchmarkExit([])).toBe(0)
  })

  it("is 0 even when check steps were RED — a red tree is a measured tree (decouple)", () => {
    expect(computeBenchmarkExit([])).toBe(0)
  })

  it("is 1 when a preparation phase failed at the runWorkflow level (measurement incomplete)", () => {
    expect(computeBenchmarkExit(["cold-stage: step preparation-prep failed"])).toBe(1)
  })

  it("is 1 when more than one preparation phase failed", () => {
    expect(computeBenchmarkExit(["cold-stage: boom", "warm-prep: boom"])).toBe(1)
  })
})

describe("assembleInnerReport", () => {
  it("stamps the timed-boundary witness and copies the phase timings", () => {
    const steps = [timing({ name: "check-a", phase: "check", durationMs: 12 })]
    const report = assembleInnerReport({
      node: "node-06",
      store: "disk",
      targetSha: "abc123",
      wallClockMs: 999,
      steps,
    })
    expect(report.preludeExcludedFromColdStage).toBe(true)
    expect(report.node).toBe("node-06")
    expect(report.store).toBe("disk")
    expect(report.wallClockMs).toBe(999)
    expect(report.steps).toEqual(steps)
    expect(report.steps).not.toBe(steps)
  })
})

describe("BENCHMARK_STEP_CONCURRENCY", () => {
  it("is a fixed positive constant (node-independent for comparability)", () => {
    expect(BENCHMARK_STEP_CONCURRENCY).toBeGreaterThan(0)
  })
})
