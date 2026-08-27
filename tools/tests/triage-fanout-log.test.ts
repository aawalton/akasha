import { describe, expect, test } from "bun:test"
import { AT, evidenceOf, resolvedAttributionOf } from "./triage-fanout-test-support.ts"
import { analyzeFanoutLog, normalizeLogInput } from "../lib/triage-fanout-log.ts"

function greenBlock(pkgRoot: string): readonly string[] {
  return [
    `[run-workspace-tests] ${pkgRoot}: running 3 selected test file(s)`,
    "(pass) some suite > does a thing [0.10ms]",
    "",
    " 618 pass",
    " 0 fail",
    " 39169 expect() calls",
    "Ran 618 tests across 51 files. [41.06s]",
  ]
}

function redBlock(pkgRoot: string): readonly string[] {
  return [
    `[run-workspace-tests] ${pkgRoot}: running 3 selected test file(s)`,
    "(fail) some suite > breaks [0.50ms]",
    "",
    " 615 pass",
    " 3 fail",
    " 39000 expect() calls",
    "Ran 618 tests across 51 files. [42.10s]",
  ]
}

function announce(count: number): string {
  return `[run-typed-tests] unit: ${count} test-bearing workspace(s), fan-out -P 12`
}

function skipLine(pkgRoot: string): string {
  return `[run-workspace-tests] ${pkgRoot}: no test files reached by changed files — skipping`
}

function stepRefusal(testType: string): string {
  return `[run-typed-tests] ${testType}: NO test-bearing workspaces — this step executed no test — refusing`
}

function workspaceRefusal(pkgRoot: string): string {
  return `[run-workspace-tests] ${pkgRoot}: NO eligible test files, though declared test-bearing — refusing`
}

describe("analyzeFanoutLog — both directions (the gift)", () => {
  test("non-last-workspace fail with a green last workspace → verdict fail", () => {
    const lines = [...redBlock("packages/foo"), ...greenBlock("packages/zzz-last")]
    const r = analyzeFanoutLog(lines, AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).totalFail).toBe(3)
    expect(evidenceOf(r).workspacesSeen).toEqual(["packages/foo", "packages/zzz-last"])
    expect(evidenceOf(r).failingWorkspaces).toEqual([])
    const failSummaries = lines.filter((l) => /^\s*\d+\s+fail\b/.test(l))
    expect(failSummaries.at(-1)).toBe(" 0 fail")
    expect(failSummaries).toContain(" 3 fail")
  })

  test("all-green log → verdict pass", () => {
    const lines = [announce(2), ...greenBlock("packages/foo"), ...greenBlock("packages/bar")]
    const r = analyzeFanoutLog(lines, AT)
    expect(r.kind).toBe("pass")
    expect(evidenceOf(r).totalFail).toBe(0)
    expect(evidenceOf(r).failingWorkspaces).toEqual([])
    expect(evidenceOf(r).workspacesSeen).toEqual(["packages/foo", "packages/bar"])
  })
})

describe("analyzeFanoutLog — completeness gate (no false-green on a truncated log)", () => {
  test("truncated tail: surviving green summary, announce line gone → unknown (NOT pass)", () => {
    const lines = [
      "(pass) late suite > ok [0.2ms]",
      " 618 pass",
      " 0 fail",
      "Ran 618 tests across 51 files. [41.06s]",
    ]
    expect(analyzeFanoutLog(lines, AT).kind).toBe("fail")
  })

  test("announce present, ≥1 clean terminal, count shortfall is diagnostic → pass", () => {
    const lines = [announce(3), ...greenBlock("packages/foo")]
    const r = analyzeFanoutLog(lines, AT)
    expect(r.kind).toBe("pass")
    expect(evidenceOf(r).expectedWorkspaces).toBe(3)
    expect(evidenceOf(r).cleanTerminals).toBe(1)
  })

  test("announce present but zero clean terminals (head-only slice) → unknown", () => {
    const lines = [announce(3), "(pass) something started but never finished [0.1ms]"]
    expect(analyzeFanoutLog(lines, AT).kind).toBe("fail")
  })

  test("all workspaces skipped, full announce count → pass despite no bun summary", () => {
    const lines = [
      announce(3),
      skipLine("packages/a"),
      skipLine("packages/b"),
      skipLine("packages/c"),
    ]
    expect(analyzeFanoutLog(lines, AT).kind).toBe("pass")
  })

  test("a step that selected no workspace → fail, and the refusal is the finding", () => {
    const r = analyzeFanoutLog([stepRefusal("unit")], AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).refusals).toEqual([stepRefusal("unit")])
    expect(r.kind === "fail" && r.findings[0].detail).toBe(stepRefusal("unit"))
  })

  test("a workspace that enumerated nothing → fail, in an otherwise green log", () => {
    const lines = [announce(2), workspaceRefusal("packages/foo"), ...greenBlock("packages/bar")]
    const r = analyzeFanoutLog(lines, AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).totalFail).toBe(0)
    expect(evidenceOf(r).refusals).toEqual([workspaceRefusal("packages/foo")])
  })

  test("a legitimate skip is not counted as a refusal", () => {
    const r = analyzeFanoutLog([announce(1), skipLine("packages/a")], AT)
    expect(r.kind).toBe("pass")
    expect(evidenceOf(r).refusals).toEqual([])
    expect(evidenceOf(r).cleanTerminals).toBe(1)
  })

  test("complete log with a failing workspace → fail", () => {
    const lines = [announce(2), ...redBlock("packages/foo"), ...greenBlock("packages/bar")]
    const r = analyzeFanoutLog(lines, AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).workspacesSeen).toEqual(["packages/foo", "packages/bar"])
  })

  test("complete log mixing a skip and a summary terminal (announce 2) → pass", () => {
    const lines = [announce(2), skipLine("packages/a"), ...greenBlock("packages/b")]
    expect(analyzeFanoutLog(lines, AT).kind).toBe("pass")
  })
})

describe("analyzeFanoutLog — verdict is order-independent (interleaving safe)", () => {
  test("an interleaved fail line before the last green summary still → fail", () => {
    const lines = [
      "[run-workspace-tests] packages/foo: running 2 selected test file(s)",
      "[run-workspace-tests] packages/bar: running 9 selected test file(s)",
      "(fail) bar suite > flakes [1.0ms]",
      " 8 pass",
      " 1 fail",
      "Ran 9 tests across 4 files. [3.0s]",
      "(pass) foo suite > ok [0.2ms]",
      " 2 pass",
      " 0 fail",
      "Ran 2 tests across 1 file. [1.0s]",
    ]
    const r = analyzeFanoutLog(lines, AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).totalFail).toBe(1)
    expect(evidenceOf(r).failingWorkspaces).toEqual([])
    expect(evidenceOf(r).failLines.every((l) => l.attribution.kind === "declined")).toBe(true)
  })
})

describe("analyzeFanoutLog — guards (no false-green either direction)", () => {
  test("crash with no summary → unknown (never pass)", () => {
    const lines = [
      "[run-workspace-tests] packages/foo: running 1 selected test file(s)",
      "error: Cannot find module './missing'",
      "    at <anonymous>",
    ]
    expect(analyzeFanoutLog(lines, AT).kind).toBe("fail")
  })

  test("ANSI-colored fail tally is still counted", () => {
    const lines = [
      "[run-workspace-tests] packages/foo: running 1 selected test file(s)",
      "[31m 2 fail[0m",
      "Ran 5 tests across 1 file. [0.5s]",
    ]
    const r = analyzeFanoutLog(lines, AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).totalFail).toBe(2)
  })

  test("a fail before any section marker attributes to (unattributed)", () => {
    const lines = ["(fail) orphan > x", " 1 fail", "Ran 1 tests across 1 file. [0.1s]"]
    const r = analyzeFanoutLog(lines, AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).failingWorkspaces).toEqual(["(unattributed)"])
  })
})

describe("analyzeFanoutLog — attribution is scoped to the producing process", () => {
  function taggedInterleaved(): readonly string[] {
    return [
      announce(2),
      "[run-workspace-tests] packages/owner: running all 2 eligible test file(s)",
      "[run-workspace-tests] packages/bystander: running all 1 eligible test file(s)",
      "[fanout-ws:packages/owner] src/owns-the-failure.unit.test.ts:",
      "[fanout-ws:packages/bystander] src/innocent.unit.test.ts:",
      "[fanout-ws:packages/bystander] (pass) bystander suite > fine [0.30ms]",
      "[fanout-ws:packages/owner] (fail) owning suite > breaks [0.70ms]",
      "[fanout-ws:packages/bystander]  0 fail",
      "[fanout-ws:packages/bystander] Ran 4 tests across 1 file. [1.00s]",
      "[fanout-ws:packages/owner]  1 fail",
      "[fanout-ws:packages/owner] Ran 9 tests across 2 files. [2.00s]",
    ]
  }

  test("the failure takes its own producer's file header, not the nearest preceding one", () => {
    const r = analyzeFanoutLog(taggedInterleaved(), AT)
    expect(r.kind).toBe("fail")
    expect(resolvedAttributionOf(r, "(fail)").file).toBe("src/owns-the-failure.unit.test.ts")
    expect(evidenceOf(r).failingFiles).not.toContain("src/innocent.unit.test.ts")
  })

  test("the attribution names the basis it rests on and the producer it was scoped to", () => {
    const attribution = resolvedAttributionOf(analyzeFanoutLog(taggedInterleaved(), AT), "(fail)")
    expect(attribution.basis).toBe("producer-tagged")
    expect(attribution.workspace).toBe("packages/owner")
  })

  test("a fail tally names its producer's workspace and claims no file", () => {
    const attribution = resolvedAttributionOf(analyzeFanoutLog(taggedInterleaved(), AT), "1 fail")
    expect(attribution.workspace).toBe("packages/owner")
    expect(attribution.file).toBeNull()
  })

  test("a tagged failure with no header yet from its own producer claims no file", () => {
    const lines = [
      announce(2),
      "[fanout-ws:packages/bystander] src/innocent.unit.test.ts:",
      "[fanout-ws:packages/owner] (fail) orphan suite > breaks [0.1ms]",
      "[fanout-ws:packages/owner]  1 fail",
      "[fanout-ws:packages/owner] Ran 1 tests across 1 file. [0.1s]",
    ]
    const attribution = resolvedAttributionOf(analyzeFanoutLog(lines, AT), "(fail)")
    expect(attribution.workspace).toBe("packages/owner")
    expect(attribution.file).toBeNull()
    expect(evidenceOf(analyzeFanoutLog(lines, AT)).failingFiles).toEqual([])
  })

  test("the stack-trace path line is NOT mistaken for a file header", () => {
    const lines = [
      ...taggedInterleaved(),
      "[fanout-ws:packages/owner]       at <anonymous> (/ci/checkouts/abc/packages/owner/src/elsewhere.unit.test.ts:62:23)",
    ]
    expect(evidenceOf(analyzeFanoutLog(lines, AT)).failingFiles).toEqual([
      "src/owns-the-failure.unit.test.ts",
    ])
  })

  test("a tagged producer counts as a workspace seen", () => {
    const r = analyzeFanoutLog(taggedInterleaved(), AT)
    expect(evidenceOf(r).workspacesSeen).toContain("packages/owner")
    expect(evidenceOf(r).workspacesSeen.length).toBeGreaterThanOrEqual(
      evidenceOf(r).failingWorkspaces.length
    )
  })

  test("the producer tag never reaches the verdict", () => {
    const r = analyzeFanoutLog(taggedInterleaved(), AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).totalFail).toBe(1)
  })
})

describe("analyzeFanoutLog — verdict envelope (coverage & findings)", () => {
  test("a fail with no resolved test file yields a finding with at: null", () => {
    const lines = [
      "[run-workspace-tests] packages/foo: running 1 selected test file(s)",
      "(fail) orphan suite > breaks [0.1ms]",
      " 1 fail",
      "Ran 1 tests across 1 file. [0.1s]",
    ]
    const r = analyzeFanoutLog(lines, AT)
    if (r.kind !== "fail") throw new Error(`expected fail, got ${r.kind}`)
    const finding = r.findings.find((f) => f.detail.startsWith("(fail)"))
    expect(finding).toBeDefined()
    expect(finding?.at).toBeNull()
  })

  test("no announce line at all → coverage.declared is null, not 0", () => {
    const lines = [...greenBlock("packages/foo")]
    const r = analyzeFanoutLog(lines, AT)
    expect(r.kind).toBe("fail")
    expect(r.coverage.declared).toBeNull()
  })
})

describe("normalizeLogInput — boundary parse", () => {
  test("plain text is returned line-by-line unchanged", () => {
    const text = "line a\nline b\nline c"
    expect(normalizeLogInput(text)).toEqual(["line a", "line b", "line c"])
  })

  test("loki JSONL (newest-first) is parsed and sorted chronologically", () => {
    const jsonl = [
      JSON.stringify({ timestamp: "2026-06-29T00:00:03.000Z", line: " 0 fail" }),
      JSON.stringify({
        timestamp: "2026-06-29T00:00:01.000Z",
        line: "[run-workspace-tests] packages/foo: running 1 selected test file(s)",
      }),
      JSON.stringify({ timestamp: "2026-06-29T00:00:02.000Z", line: "(pass) ok" }),
    ].join("\n")
    expect(normalizeLogInput(jsonl)).toEqual([
      "[run-workspace-tests] packages/foo: running 1 selected test file(s)",
      "(pass) ok",
      " 0 fail",
    ])
  })

  test("end-to-end: loki JSONL of a non-last-fail run → fail after normalize", () => {
    const chrono = [...redBlock("packages/foo"), ...greenBlock("packages/zzz-last")]
    const jsonl = chrono
      .map((line, i) => ({
        timestamp: `2026-06-29T00:00:${String(i).padStart(2, "0")}.000Z`,
        line,
      }))
      .reverse()
      .map((r) => JSON.stringify(r))
      .join("\n")
    const r = analyzeFanoutLog(normalizeLogInput(jsonl), AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).totalFail).toBe(3)
  })

  test("malformed JSON falls back to plain text", () => {
    const mixed = '{"timestamp":"x","line":"a"}\nnot json'
    expect(normalizeLogInput(mixed)).toEqual(['{"timestamp":"x","line":"a"}', "not json"])
  })

  test("empty input → empty list", () => {
    expect(normalizeLogInput("")).toEqual([])
    expect(normalizeLogInput("\n  \n")).toEqual([])
  })
})
