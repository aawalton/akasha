import { describe, expect, test } from "bun:test"
import { AT, evidenceOf, resolvedAttributionOf } from "./triage-fanout-test-support.ts"
import { analyzeFanoutLog } from "../lib/triage-fanout-log.ts"
import {
  REAL_INTERLEAVED_FANOUT_LOG,
  REAL_MISATTRIBUTED_FILES,
  REAL_MISATTRIBUTED_WORKSPACES,
  REAL_OWNER_FILE_HEADER,
} from "./triage-fanout-real-log-fixture.ts"
import { renderResult } from "../lib/triage-fanout-render.ts"

describe("analyzeFanoutLog — declines to attribute where the producer is undetermined", () => {
  test("neither clean file the positional cursors named is reported", () => {
    const r = analyzeFanoutLog(REAL_INTERLEAVED_FANOUT_LOG, AT)
    expect(r.kind).toBe("fail")
    for (const wrong of REAL_MISATTRIBUTED_FILES) {
      expect(evidenceOf(r).failingFiles).not.toContain(wrong)
    }
    for (const wrong of REAL_MISATTRIBUTED_WORKSPACES) {
      expect(evidenceOf(r).failingWorkspaces).not.toContain(wrong)
    }
    expect(evidenceOf(r).failingFiles).toEqual([])
  })

  test("the owner is not named either — a decline claims nothing, it does not guess right", () => {
    const r = analyzeFanoutLog(REAL_INTERLEAVED_FANOUT_LOG, AT)
    expect(evidenceOf(r).failingFiles).not.toContain(REAL_OWNER_FILE_HEADER)
  })

  test("every finding over that log declines its location", () => {
    const r = analyzeFanoutLog(REAL_INTERLEAVED_FANOUT_LOG, AT)
    if (r.kind !== "fail") throw new Error(`expected fail, got ${r.kind}`)
    expect(r.findings.length).toBeGreaterThan(0)
    expect(r.findings.every((f) => f.at === null)).toBe(true)
    expect(evidenceOf(r).failLines.every((l) => l.attribution.kind === "declined")).toBe(true)
  })

  test("the verdict over that same log is unchanged — exact where attribution is not", () => {
    const r = analyzeFanoutLog(REAL_INTERLEAVED_FANOUT_LOG, AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).totalFail).toBe(2)
    expect(evidenceOf(r).failEvidence.length).toBeGreaterThan(0)
  })

  test("the render names no file, says the attribution was declined, and says what does resolve", () => {
    const out = renderResult(analyzeFanoutLog(REAL_INTERLEAVED_FANOUT_LOG, AT))
    for (const wrong of REAL_MISATTRIBUTED_FILES) expect(out).not.toContain(wrong)
    for (const wrong of REAL_MISATTRIBUTED_WORKSPACES) expect(out).not.toContain(wrong)
    expect(out).toMatch(/declined/i)
    expect(out).toMatch(/test name/i)
  })
})

describe("analyzeFanoutLog — a single-producer log keeps positional attribution", () => {
  function singleProducerShaped(): readonly string[] {
    return [
      "[suite-run] === batch 2/8 (fail) — 42 suite(s) ===",
      "packages/alanwalton/daily-tracking-cli/src/cardio-ingest.unit.test.ts:",
      "(fail) cardio-ingest > refuses a future date [0.25ms]",
      " 1 fail",
      "Ran 112 tests across 13 files. [682.00ms]",
    ]
  }

  test("the failing file is still named", () => {
    const r = analyzeFanoutLog(singleProducerShaped(), AT)
    expect(r.kind).toBe("fail")
    expect(evidenceOf(r).failingFiles).toEqual([
      "packages/alanwalton/daily-tracking-cli/src/cardio-ingest.unit.test.ts",
    ])
  })

  test("its basis records WHY positional was sound here", () => {
    expect(
      resolvedAttributionOf(analyzeFanoutLog(singleProducerShaped(), AT), "(fail)").basis
    ).toBe("single-stream")
  })

  test("one runner marker is enough to make the stream concurrent again", () => {
    const lines = [
      "[run-workspace-tests] packages/foo: running 1 selected test file(s)",
      ...singleProducerShaped().slice(1),
    ]
    const r = analyzeFanoutLog(lines, AT)
    expect(evidenceOf(r).failingFiles).toEqual([])
    expect(evidenceOf(r).failLines.every((l) => l.attribution.kind === "declined")).toBe(true)
  })
})
