import { describe, expect, test } from "bun:test"
import {
  AS_GIVEN,
  decideNamedSuitesExit,
  isEnumerableTestPath,
  planSuiteRuns,
  UNTYPED,
  verdictForNamedSuites,
} from "../lib/run-named-suites.ts"

const AT = 1_700_000_000_000

const GREEN = [
  " 5 pass",
  " 0 fail",
  " 14 expect() calls",
  "Ran 5 tests across 1 file. [614.00ms]",
].join("\n")

const RED = [" 0 pass", " 5 fail", "Ran 5 tests across 1 file. [196.00ms]"].join("\n")

const NO_SUMMARY = Array.from({ length: 142 }, (_, i) => `(fail) case ${i + 1} [0.1ms]`).join("\n")

const oneRun = (bunExitCode: number, output: string) => [{ label: "unit", bunExitCode, output }]

describe("verdictForNamedSuites — the false red an agent sees", () => {
  test("a green summary under bun's nonzero PGlite exit is a pass", () => {
    const v = verdictForNamedSuites({ runs: oneRun(99, GREEN), observedAtMs: AT })
    expect(v.kind).toBe("pass")
    expect(decideNamedSuitesExit(v)).toBe(0)
  })

  test("the pass says which exit code it forgave, so the reader is not left guessing", () => {
    const v = verdictForNamedSuites({ runs: oneRun(99, GREEN), observedAtMs: AT })
    expect(v.reason).toContain("99")
  })

  test("an already-clean exit 0 is a pass", () => {
    const v = verdictForNamedSuites({ runs: oneRun(0, GREEN), observedAtMs: AT })
    expect(v.kind).toBe("pass")
    expect(decideNamedSuitesExit(v)).toBe(0)
  })
})

describe("verdictForNamedSuites — red stays red", () => {
  test("a positive fail tally is a fail", () => {
    const v = verdictForNamedSuites({ runs: oneRun(1, RED), observedAtMs: AT })
    expect(v.kind).toBe("fail")
    expect(decideNamedSuitesExit(v)).toBe(1)
  })

  test("a fail names at least one finding", () => {
    const v = verdictForNamedSuites({ runs: oneRun(1, RED), observedAtMs: AT })
    if (v.kind !== "fail") throw new Error(`expected fail, got ${v.kind}`)
    expect(v.findings.length).toBeGreaterThan(0)
  })

  test("a positive fail tally under the forgiven exit code is still a fail", () => {
    const v = verdictForNamedSuites({ runs: oneRun(99, RED), observedAtMs: AT })
    expect(v.kind).toBe("fail")
    expect(decideNamedSuitesExit(v)).toBe(1)
  })

  test("a nonzero exit with no summary at all is a fail, not a pass", () => {
    const v = verdictForNamedSuites({
      runs: oneRun(1, "error: Cannot find module './nope'"),
      observedAtMs: AT,
    })
    expect(v.kind).toBe("fail")
    expect(decideNamedSuitesExit(v)).toBe(1)
  })
})

describe("verdictForNamedSuites — a run that could not be observed", () => {
  test("a signal death with no summary refuses", () => {
    const v = verdictForNamedSuites({ runs: oneRun(137, ""), observedAtMs: AT })
    expect(v.kind).toBe("fail")
    expect(decideNamedSuitesExit(v)).toBe(2)
    expect(v.kind === "fail" && v.findings[0]?.detail).toContain("died on a signal")
  })

  test("an xargs-collapsed signal death refuses too", () => {
    const v = verdictForNamedSuites({ runs: oneRun(125, ""), observedAtMs: AT })
    expect(v.kind).toBe("fail")
  })

  test("a group that printed no summary voids the verdict, though other groups reported", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: UNTYPED, bunExitCode: 1, output: NO_SUMMARY },
        { label: "unit", bunExitCode: 1, output: RED },
      ],
      observedAtMs: AT,
    })
    expect(v.kind).toBe("fail")
    expect(v.reason).toContain("certifies nothing")
  })

  test("the void names the group that printed nothing", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: UNTYPED, bunExitCode: 1, output: NO_SUMMARY },
        { label: "unit", bunExitCode: 1, output: RED },
      ],
      observedAtMs: AT,
    })
    if (v.kind !== "fail") throw new Error(`expected fail, got ${v.kind}`)
    expect(v.reason).toContain(UNTYPED)
    expect(v.findings.map((f) => f.at)).toContain(UNTYPED)
  })

  test("the void claims no failing-test count, the counted groups not being the run", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: UNTYPED, bunExitCode: 1, output: NO_SUMMARY },
        { label: "unit", bunExitCode: 1, output: RED },
      ],
      observedAtMs: AT,
    })
    expect(v.reason).not.toContain("failing test(s)")
  })

  test("what the groups that did report found is still named, so nothing is lost", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: UNTYPED, bunExitCode: 1, output: NO_SUMMARY },
        { label: "unit", bunExitCode: 1, output: RED },
      ],
      observedAtMs: AT,
    })
    if (v.kind !== "fail") throw new Error(`expected fail, got ${v.kind}`)
    expect(v.findings.map((f) => f.at)).toContain("unit")
    expect(v.findings.some((f) => f.detail.includes("5 failing test(s)"))).toBe(true)
  })

  test("a group that died on a signal voids the verdict even where another group failed", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: UNTYPED, bunExitCode: 137, output: NO_SUMMARY },
        { label: "unit", bunExitCode: 1, output: RED },
      ],
      observedAtMs: AT,
    })
    expect(v.kind).toBe("fail")
    expect(v.reason).toContain("certifies nothing")
    expect(v.reason).not.toContain("failing test(s)")
    if (v.kind !== "fail") throw new Error(`expected fail, got ${v.kind}`)
    expect(v.findings.some((f) => f.detail.includes("died on a signal"))).toBe(true)
  })

  test("a group that printed no summary and exited 0 is not a pass", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: "unit", bunExitCode: 0, output: GREEN },
        { label: UNTYPED, bunExitCode: 0, output: NO_SUMMARY },
      ],
      observedAtMs: AT,
    })
    expect(v.kind).toBe("fail")
  })

  test("a run whose every group printed a summary still passes", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: "unit", bunExitCode: 0, output: GREEN },
        { label: "cli", bunExitCode: 0, output: GREEN },
        { label: "database", bunExitCode: 99, output: GREEN },
      ],
      observedAtMs: AT,
    })
    expect(v.kind).toBe("pass")
    expect(decideNamedSuitesExit(v)).toBe(0)
  })
})

describe("verdictForNamedSuites — coverage", () => {
  test("observed is the file count the summary stated", () => {
    const v = verdictForNamedSuites({ runs: oneRun(99, GREEN), observedAtMs: AT })
    expect(v.coverage.observed).toBe(1)
    expect(v.coverage.unit).toBe("test files")
  })

  test("declared is not computed, because a filter argument fixes no denominator", () => {
    const v = verdictForNamedSuites({ runs: oneRun(99, GREEN), observedAtMs: AT })
    expect(v.coverage.declared).toBeNull()
  })

  test("a run with no summary observed zero files", () => {
    const v = verdictForNamedSuites({ runs: oneRun(137, ""), observedAtMs: AT })
    expect(v.coverage.observed).toBe(0)
  })

  test("observed sums the files every group reported", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: "unit", bunExitCode: 0, output: GREEN },
        { label: "smoke", bunExitCode: 0, output: GREEN },
        { label: "cli", bunExitCode: 0, output: GREEN },
      ],
      observedAtMs: AT,
    })
    expect(v.coverage.observed).toBe(3)
  })
})

describe("verdictForNamedSuites — a failure in ANY group is the run's failure", () => {
  test("a positive fail tally in a LATER group is still a fail", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: "unit", bunExitCode: 0, output: GREEN },
        { label: "property", bunExitCode: 0, output: GREEN },
        { label: "smoke", bunExitCode: 1, output: RED },
      ],
      observedAtMs: AT,
    })
    expect(v.kind).toBe("fail")
    expect(decideNamedSuitesExit(v)).toBe(1)
  })

  test("the fail names the group that produced it", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: "unit", bunExitCode: 0, output: GREEN },
        { label: "smoke", bunExitCode: 1, output: RED },
      ],
      observedAtMs: AT,
    })
    if (v.kind !== "fail") throw new Error(`expected fail, got ${v.kind}`)
    expect(v.findings.map((f) => f.at)).toContain("smoke")
  })

  test("the fail tally is the sum across every group", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: "unit", bunExitCode: 1, output: RED },
        { label: "smoke", bunExitCode: 1, output: RED },
      ],
      observedAtMs: AT,
    })
    expect(v.reason).toContain("10")
  })

  test("every group green is a pass", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: "unit", bunExitCode: 0, output: GREEN },
        { label: "database", bunExitCode: 99, output: GREEN },
      ],
      observedAtMs: AT,
    })
    expect(v.kind).toBe("pass")
    expect(decideNamedSuitesExit(v)).toBe(0)
  })

  test("one group's unobservable crash is unknown, never a pass", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: "unit", bunExitCode: 0, output: GREEN },
        { label: "cli", bunExitCode: 137, output: "" },
      ],
      observedAtMs: AT,
    })
    expect(v.kind).toBe("fail")
    expect(decideNamedSuitesExit(v)).toBe(2)
  })

  test("a fail in one group outranks a crash in another", () => {
    const v = verdictForNamedSuites({
      runs: [
        { label: "unit", bunExitCode: 1, output: RED },
        { label: "cli", bunExitCode: 137, output: "" },
      ],
      observedAtMs: AT,
    })
    expect(v.kind).toBe("fail")
  })
})

describe("planSuiteRuns — one bun process per test type", () => {
  test("a mixed file set partitions into one group per type suffix", () => {
    const groups = planSuiteRuns([
      {
        arg: "pkg",
        files: [
          "pkg/a.unit.test.ts",
          "pkg/b.smoke.test.ts",
          "pkg/c.unit.test.ts",
          "pkg/d.cli.test.ts",
        ],
      },
    ])
    expect(groups.map((g) => g.label)).toEqual(["cli", "smoke", "unit"])
    expect(groups.find((g) => g.label === "unit")?.paths).toEqual([
      "pkg/a.unit.test.ts",
      "pkg/c.unit.test.ts",
    ])
  })

  test("files named across several arguments group by type, not by argument", () => {
    const groups = planSuiteRuns([
      { arg: "one", files: ["one/a.unit.test.ts"] },
      { arg: "two", files: ["two/b.unit.test.ts"] },
    ])
    expect(groups).toHaveLength(1)
    expect(groups[0]?.paths).toEqual(["one/a.unit.test.ts", "two/b.unit.test.ts"])
  })

  test("a path named twice is run once", () => {
    const groups = planSuiteRuns([
      { arg: "pkg", files: ["pkg/a.unit.test.ts"] },
      { arg: "pkg/a.unit.test.ts", files: ["pkg/a.unit.test.ts"] },
    ])
    expect(groups[0]?.paths).toEqual(["pkg/a.unit.test.ts"])
  })

  test("an argument naming no existing path is run as given", () => {
    const groups = planSuiteRuns([{ arg: "oauth-db", files: null }])
    expect(groups).toEqual([{ label: AS_GIVEN, paths: ["oauth-db"] }])
  })

  test("a filter argument never shares a process with a typed file", () => {
    const groups = planSuiteRuns([
      { arg: "pkg", files: ["pkg/a.unit.test.ts"] },
      { arg: "oauth-db", files: null },
    ])
    expect(groups.map((g) => g.label)).toEqual([AS_GIVEN, "unit"])
  })

  test("a file with no type suffix gets its own group", () => {
    const groups = planSuiteRuns([
      { arg: "pkg", files: ["pkg/a.unit.test.ts", "pkg/legacy.test.ts"] },
    ])
    expect(groups.map((g) => g.label)).toEqual([UNTYPED, "unit"])
    expect(groups.find((g) => g.label === UNTYPED)?.paths).toEqual(["pkg/legacy.test.ts"])
  })

  test("arguments that expand to nothing are handed back to bun unchanged", () => {
    const groups = planSuiteRuns([{ arg: "pkg/docs", files: [] }])
    expect(groups).toEqual([{ label: AS_GIVEN, paths: ["pkg/docs"] }])
  })
})

describe("isEnumerableTestPath — a fixture tree is specimen data, not a suite", () => {
  test("a path under a __fixtures__ segment is not a source of tests", () => {
    expect(isEnumerableTestPath("__fixtures__/mock-module-leak/pkg-a/src/stub.unit.test.ts")).toBe(
      false
    )
    expect(isEnumerableTestPath("src/lib/__fixtures__/seed/fc.unit.test.ts")).toBe(false)
  })

  test("node_modules stays excluded", () => {
    expect(isEnumerableTestPath("node_modules/@scope/pkg/dist/thing.test.js")).toBe(false)
  })

  test("an ordinary test path is a source of tests", () => {
    expect(isEnumerableTestPath("src/lib/select-tests.unit.test.ts")).toBe(true)
  })

  test("the excluded names are whole path segments rather than substrings", () => {
    expect(isEnumerableTestPath("src/__fixtures__loader/build.unit.test.ts")).toBe(true)
    expect(isEnumerableTestPath("src/fixtures/shape.unit.test.ts")).toBe(true)
    expect(isEnumerableTestPath("src/node_modules_shim/resolve.unit.test.ts")).toBe(true)
  })
})
