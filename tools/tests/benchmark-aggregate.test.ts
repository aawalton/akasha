import { describe, expect, it } from "bun:test"

import {
  aggregatePhases,
  computeStoreDelta,
  DECLARED_BENCHMARK_REDS,
  dockerSkipCensus,
  redSet,
  redSetsMatch,
  smokeVerdict,
  undeclaredReds,
} from "../lib/benchmark-aggregate.ts"
import type { StepTiming } from "../lib/benchmark-code.ts"

function step(over: Partial<StepTiming> & Pick<StepTiming, "name" | "phase">): StepTiming {
  return {
    durationMs: 0,
    exitCode: 0,
    image: "oven/bun:1",
    skipped: false,
    ...over,
  }
}

const STEPS: readonly StepTiming[] = [
  step({ name: "cold-fetch", phase: "cold-stage", durationMs: 1000 }),
  step({ name: "cold-install", phase: "cold-stage", durationMs: 2000 }),
  step({ name: "prep-build-graph", phase: "warm-prep", durationMs: 500 }),
  step({ name: "check-file-length", phase: "check", durationMs: 300 }),
  step({
    name: "check-sops-manifests",
    phase: "check",
    durationMs: 0,
    image: "debian:bookworm-slim",
    skipped: true,
  }),
  step({ name: "check-types", phase: "check", durationMs: 400, exitCode: 1 }),
]

describe("aggregatePhases", () => {
  it("rolls up per-phase totals, counting skipped steps apart from timed ones", () => {
    const rollups = aggregatePhases(STEPS)
    const byPhase = new Map(rollups.map((r) => [r.phase, r]))
    expect(byPhase.get("cold-stage")).toMatchObject({
      totalStepMs: 3000,
      totalStepSeconds: 3,
      stepCount: 2,
      skippedCount: 0,
    })
    expect(byPhase.get("warm-prep")).toMatchObject({
      totalStepMs: 500,
      totalStepSeconds: 0.5,
      stepCount: 1,
      skippedCount: 0,
    })
    expect(byPhase.get("check")).toMatchObject({
      totalStepMs: 700,
      totalStepSeconds: 0.7,
      stepCount: 2,
      skippedCount: 1,
    })
  })

  it("includes every phase even when empty", () => {
    const rollups = aggregatePhases([step({ name: "only-check", phase: "check", durationMs: 100 })])
    const cold = rollups.find((r) => r.phase === "cold-stage")
    expect(cold).toMatchObject({ totalStepMs: 0, stepCount: 0, skippedCount: 0 })
  })
})

describe("dockerSkipCensus", () => {
  it("reports skipped docker-image steps by count and sorted name — no silent cap", () => {
    const census = dockerSkipCensus(STEPS)
    expect(census.count).toBe(1)
    expect(census.names).toEqual(["check-sops-manifests"])
  })

  it("is empty when nothing was skipped", () => {
    const census = dockerSkipCensus([step({ name: "a", phase: "check", durationMs: 1 })])
    expect(census).toEqual({ count: 0, names: [] })
  })
})

describe("smokeVerdict", () => {
  it("fails when any non-skipped step has a non-zero exit code", () => {
    expect(smokeVerdict(STEPS)).toEqual({ pass: false, failedSteps: ["check-types"] })
  })

  it("passes when every non-skipped step exited 0 (skipped non-zero ignored)", () => {
    const clean: readonly StepTiming[] = [
      step({ name: "a", phase: "check", durationMs: 10 }),
      step({ name: "skipped-fail", phase: "check", exitCode: 2, skipped: true }),
    ]
    expect(smokeVerdict(clean)).toEqual({ pass: true, failedSteps: [] })
  })
})

describe("computeStoreDelta", () => {
  it("computes per-phase disk-minus-memory delta and speedup percent (matched red sets)", () => {
    const disk: readonly StepTiming[] = [step({ name: "c", phase: "cold-stage", durationMs: 3000 })]
    const memory: readonly StepTiming[] = [
      step({ name: "c", phase: "cold-stage", durationMs: 1800 }),
    ]
    const result = computeStoreDelta(disk, memory)
    if (result.kind !== "delta") throw new Error(`expected a delta, got ${result.kind}`)
    const cold = result.phases.find((d) => d.phase === "cold-stage")
    expect(cold).toEqual({
      phase: "cold-stage",
      diskMs: 3000,
      memoryMs: 1800,
      deltaMs: 1200,
      speedupPct: 40,
    })
  })

  it("guards divide-by-zero when the disk phase had no time", () => {
    const result = computeStoreDelta([], [step({ name: "c", phase: "check", durationMs: 5 })])
    if (result.kind !== "delta") throw new Error(`expected a delta, got ${result.kind}`)
    const check = result.phases.find((d) => d.phase === "check")
    expect(check).toMatchObject({ diskMs: 0, memoryMs: 5, deltaMs: -5, speedupPct: 0 })
  })

  it("REFUSES the delta when the two runs' red sets differ (comparability guard)", () => {
    const disk: readonly StepTiming[] = [step({ name: "c", phase: "check", durationMs: 3000 })]
    const memory: readonly StepTiming[] = [
      step({ name: "c", phase: "check", durationMs: 5, exitCode: 127 }),
    ]
    const result = computeStoreDelta(disk, memory)
    expect(result.kind).toBe("refused")
    if (result.kind !== "refused") throw new Error("expected refusal")
    expect(result.reason).toContain("red sets differ")
    expect(result.reason).toContain("c(127)")
  })

  it("computes the delta when both runs share the SAME red set (identical reds)", () => {
    const red = { name: "sops", phase: "check", exitCode: 1 } as const
    const disk: readonly StepTiming[] = [
      step({ name: "c", phase: "cold-stage", durationMs: 3000 }),
      step({ ...red, durationMs: 1 }),
    ]
    const memory: readonly StepTiming[] = [
      step({ name: "c", phase: "cold-stage", durationMs: 1800 }),
      step({ ...red, durationMs: 1 }),
    ]
    const result = computeStoreDelta(disk, memory)
    expect(result.kind).toBe("delta")
  })
})

describe("DECLARED_BENCHMARK_REDS / undeclaredReds", () => {
  it("declares each expected env/latent red with name, exit code, and a non-empty cause", () => {
    expect(DECLARED_BENCHMARK_REDS.length).toBeGreaterThan(0)
    for (const d of DECLARED_BENCHMARK_REDS) {
      expect(d.name).toMatch(/^check-/)
      expect(Number.isInteger(d.exitCode)).toBe(true)
      expect(d.cause.length).toBeGreaterThan(0)
    }
  })

  const declared = [
    { name: "check-sops-manifests", exitCode: 1, cause: "no K8s API" },
    { name: "check-unit-tests", exitCode: 123, cause: "shard needs a service" },
  ] as const

  it("returns reds NOT covered by the declared set (a red beyond the declared set)", () => {
    const actual = [
      { name: "check-sops-manifests", exitCode: 1 },
      { name: "check-brand-new", exitCode: 2 },
    ]
    expect(undeclaredReds(actual, declared)).toEqual([{ name: "check-brand-new", exitCode: 2 }])
  })

  it("treats a declared NAME carrying a DIFFERENT exit code as undeclared", () => {
    expect(undeclaredReds([{ name: "check-unit-tests", exitCode: 1 }], declared)).toEqual([
      { name: "check-unit-tests", exitCode: 1 },
    ])
  })

  it("is empty when every actual red is declared (a clean, valid run)", () => {
    const actual = [
      { name: "check-unit-tests", exitCode: 123 },
      { name: "check-sops-manifests", exitCode: 1 },
    ]
    expect(undeclaredReds(actual, declared)).toEqual([])
  })
})

describe("redSet / redSetsMatch", () => {
  it("collects non-skipped non-zero-exit steps as {name, exitCode}, sorted by name", () => {
    const steps: readonly StepTiming[] = [
      step({ name: "z", phase: "check", exitCode: 2 }),
      step({ name: "a", phase: "check", exitCode: 127 }),
      step({ name: "green", phase: "check", exitCode: 0 }),
      step({ name: "skipped", phase: "check", exitCode: 9, skipped: true }),
    ]
    expect(redSet(steps)).toEqual([
      { name: "a", exitCode: 127 },
      { name: "z", exitCode: 2 },
    ])
  })

  it("matches only on identical name AND exitCode", () => {
    expect(redSetsMatch([{ name: "a", exitCode: 1 }], [{ name: "a", exitCode: 1 }])).toBe(true)
    expect(redSetsMatch([{ name: "a", exitCode: 1 }], [{ name: "a", exitCode: 2 }])).toBe(false)
    expect(redSetsMatch([{ name: "a", exitCode: 1 }], [])).toBe(false)
  })
})
