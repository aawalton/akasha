import { describe, expect, it } from "bun:test"
import { assembleOuterReport, buildMarginSweepGrid, parseInnerReportFromLogs } from "../lib/benchmark-outer-core.ts"
import { renderReport } from "../lib/benchmark-outer-render"
import {
  type InnerReport,
  runCore,
  type StepTiming,
  type StoreVariant,
} from "../lib/benchmark-code.ts"

const { BENCHMARK_REPORT_SENTINEL } = await runCore()

function step(over: Partial<StepTiming> & Pick<StepTiming, "name" | "phase">): StepTiming {
  return { durationMs: 100, exitCode: 0, image: "oven/bun:1.3.14", skipped: false, ...over }
}

function inner(store: StoreVariant, steps: readonly StepTiming[]): InnerReport {
  return {
    node: "node-06",
    store,
    targetSha: "abc123",
    wallClockMs: 1234,
    steps: [...steps],
    preludeExcludedFromColdStage: true,
  }
}

const noOutOfCpu = {
  node: "node-03",
  windowStartMs: 0,
  windowEndMs: 1,
  count: 0,
  unavailableReason: null,
}
const unavailableOutOfCpu = {
  node: "node-06",
  windowStartMs: 0,
  windowEndMs: 1,
  count: null,
  unavailableReason: "OutOfcpu event sampling failed: HTTP 403 Forbidden",
}

describe("parseInnerReportFromLogs", () => {
  it("lifts the sentinel JSON line out of interleaved logs and validates it", async () => {
    const report = inner("disk", [step({ name: "check-a", phase: "check" })])
    const logs = [
      "[bootstrap] check: running...",
      `${BENCHMARK_REPORT_SENTINEL} ${JSON.stringify(report)}`,
      "[bootstrap] check: completed",
    ].join("\n")
    expect(await parseInnerReportFromLogs(logs)).toEqual(report)
  })

  it("takes the LAST sentinel line when more than one is present", async () => {
    const first = inner("disk", [step({ name: "check-a", phase: "check", durationMs: 1 })])
    const second = inner("memory", [step({ name: "check-a", phase: "check", durationMs: 2 })])
    const logs = `${BENCHMARK_REPORT_SENTINEL} ${JSON.stringify(first)}\n${BENCHMARK_REPORT_SENTINEL} ${JSON.stringify(second)}`
    expect((await parseInnerReportFromLogs(logs)).store).toBe("memory")
  })

  it("throws a diagnostic when the marker is absent (pod died pre-report)", async () => {
    await expect(parseInnerReportFromLogs("[bootstrap] boom\nsegfault")).rejects.toThrow("not found")
  })
})

describe("buildMarginSweepGrid", () => {
  it("concentrates the sticky burst on the node under test and sweeps margins × sticky", async () => {
    const grid = await buildMarginSweepGrid("node-06")
    expect(grid.candidates.length).toBeGreaterThan(0)
    expect(grid.candidates.every((c) => c.assignedNode === "node-06")).toBe(true)
    expect(grid.margins).toContain(0)
    expect(grid.stickyOptions).toEqual([false, true])
    expect(grid.nodes.some((n) => n.nodeName === "node-06")).toBe(true)
  })
})

describe("assembleOuterReport", () => {
  const base = {
    nodeUnderTest: "node-06",
    targetSha: "abc123",
    generatedAtMs: 1000,
    unmeasuredVariants: [],
    outOfCpuObserved: noOutOfCpu,
    marginSweep: [],
  }

  it("computes family-b delta only when BOTH store variants ran", async () => {
    const bothPhases = [step({ name: "preparation-prep", phase: "cold-stage", durationMs: 500 })]
    const inners = new Map<StoreVariant, InnerReport>([
      ["disk", inner("disk", bothPhases)],
      [
        "memory",
        inner("memory", [step({ name: "preparation-prep", phase: "cold-stage", durationMs: 200 })]),
      ],
    ])
    const report = await assembleOuterReport({ ...base, inners })
    expect(report.storeDelta).not.toBeNull()
    expect(report.meta.storeVariantsRun).toEqual(["disk", "memory"])
    expect(report.variants).toHaveLength(2)
  })

  it("leaves family-b null with a single variant (baseline disk-only)", async () => {
    const inners = new Map<StoreVariant, InnerReport>([
      ["disk", inner("disk", [step({ name: "check-a", phase: "check" })])],
    ])
    const report = await assembleOuterReport({ ...base, inners })
    expect(report.storeDelta).toBeNull()
  })

  it("reports NO undeclared reds when every red is in the declared env-red set", async () => {
    const declaredRed = step({ name: "check-sops-manifests", phase: "check", exitCode: 2 })
    const inners = new Map<StoreVariant, InnerReport>([
      ["disk", inner("disk", [step({ name: "check-a", phase: "check" }), declaredRed])],
    ])
    const report = await assembleOuterReport({ ...base, inners })
    expect(report.undeclaredReds).toEqual([])
    expect(report.declaredReds.length).toBeGreaterThan(0)
  })

  it("surfaces an UNDECLARED red (beyond the declared set) as an invalidating union", async () => {
    const rogue = step({ name: "check-brand-new", phase: "check", exitCode: 2 })
    const inners = new Map<StoreVariant, InnerReport>([
      ["disk", inner("disk", [rogue])],
      ["memory", inner("memory", [step({ name: "check-a", phase: "check" })])],
    ])
    const report = await assembleOuterReport({ ...base, inners })
    expect(report.undeclaredReds).toEqual([{ name: "check-brand-new", exitCode: 2 }])
  })
})

describe("renderReport", () => {
  it("renders a loud INVALID line when an undeclared red is present", async () => {
    const inners = new Map<StoreVariant, InnerReport>([
      ["disk", inner("disk", [step({ name: "check-rogue", phase: "check", exitCode: 7 })])],
    ])
    const report = await assembleOuterReport({
      nodeUnderTest: "node-06",
      targetSha: "abc123",
      generatedAtMs: 1000,
      inners,
      unmeasuredVariants: [],
        outOfCpuObserved: noOutOfCpu,
      marginSweep: [],
    })
    const text = renderReport(report)
    expect(text).toContain("INVALID: undeclared red(s)")
    expect(text).toContain("check-rogue(7)")
  })

  it("renders family-d-observed as UNAVAILABLE (declared, not a crash) when count is null", async () => {
    const inners = new Map<StoreVariant, InnerReport>([
      ["disk", inner("disk", [step({ name: "check-a", phase: "check" })])],
    ])
    const report = await assembleOuterReport({
      nodeUnderTest: "node-06",
      targetSha: "abc123",
      generatedAtMs: 1000,
      inners,
      unmeasuredVariants: [],
        outOfCpuObserved: unavailableOutOfCpu,
      marginSweep: [],
    })
    const text = renderReport(report)
    expect(text).toContain("count=UNAVAILABLE")
    expect(text).toContain("HTTP 403")
  })
})
