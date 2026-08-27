import { describe, expect, test } from "bun:test"
import {
  CRASH_EXIT_CODE,
  classifyRun,
  decideGatedExit,
  parseBunSummary,
  UNDER_RAN_EXIT_CODE,
  underRanReport,
} from "../lib/gate-bun-exit.ts"

const GREEN_SUMMARY = [
  "(pass) some suite > does a thing [0.10ms]",
  "",
  " 618 pass",
  " 0 fail",
  " 39169 expect() calls",
  "Ran 618 tests across 51 files. [41.06s]",
].join("\n")

const RED_SUMMARY = [
  "(fail) some suite > does a thing [0.10ms]",
  "",
  " 615 pass",
  " 3 fail",
  " 39000 expect() calls",
  "Ran 618 tests across 51 files. [42.10s]",
].join("\n")

describe("decideGatedExit — both directions", () => {
  test("green run (0 fail) that exits 123 is gated to 0", () => {
    expect(decideGatedExit({ bunExitCode: 123, output: GREEN_SUMMARY })).toBe(0)
  })

  test("green run that exits 1 is gated to 0", () => {
    expect(decideGatedExit({ bunExitCode: 1, output: GREEN_SUMMARY })).toBe(0)
  })

  test("real failure (3 fail) exiting 1 propagates 1", () => {
    expect(decideGatedExit({ bunExitCode: 1, output: RED_SUMMARY })).toBe(1)
  })

  test("real failure (3 fail) exiting 123 propagates 123", () => {
    expect(decideGatedExit({ bunExitCode: 123, output: RED_SUMMARY })).toBe(123)
  })
})

describe("decideGatedExit — guards", () => {
  test("clean exit 0 stays 0 regardless of output", () => {
    expect(decideGatedExit({ bunExitCode: 0, output: GREEN_SUMMARY })).toBe(0)
    expect(decideGatedExit({ bunExitCode: 0, output: "" })).toBe(0)
  })

  test("crash with no summary propagates the original exit (fail-closed)", () => {
    const crash = "error: Cannot find module './missing'\n    at <anonymous>"
    expect(decideGatedExit({ bunExitCode: 1, output: crash })).toBe(1)
  })

  test("non-zero exit with a summary but no fail line propagates (fail-closed)", () => {
    const partial = "Ran 10 tests across 2 files. [1.0s]"
    expect(decideGatedExit({ bunExitCode: 7, output: partial })).toBe(7)
  })

  test("multiple summaries all-green (xargs arg-split) gate to 0", () => {
    const twoGreen = `${GREEN_SUMMARY}\n${GREEN_SUMMARY}`
    expect(decideGatedExit({ bunExitCode: 123, output: twoGreen })).toBe(0)
  })

  test("multiple summaries with one red still propagate", () => {
    const mixed = `${GREEN_SUMMARY}\n${RED_SUMMARY}`
    expect(decideGatedExit({ bunExitCode: 123, output: mixed })).toBe(123)
  })

  test("ANSI-colored summary is still parsed as green", () => {
    const colored = `[32m 0 fail[0m\nRan 5 tests across 1 file. [0.5s]`
    expect(decideGatedExit({ bunExitCode: 123, output: colored })).toBe(0)
  })
})

describe("CRASH_EXIT_CODE", () => {
  test("is 75 (EX_TEMPFAIL), the sentinel the shell runner matches", () => {
    expect(CRASH_EXIT_CODE).toBe(75)
  })
})

describe("classifyRun — crash-vs-genuine-failure distinction", () => {
  test("clean exit 0 is pass", () => {
    expect(classifyRun({ bunExitCode: 0, output: "" })).toBe("pass")
  })

  test("green summary with a non-zero exit is pass", () => {
    expect(classifyRun({ bunExitCode: 123, output: GREEN_SUMMARY })).toBe("pass")
    expect(classifyRun({ bunExitCode: 1, output: GREEN_SUMMARY })).toBe("pass")
  })

  test("red summary is a genuine failure regardless of exit code", () => {
    expect(classifyRun({ bunExitCode: 1, output: RED_SUMMARY })).toBe("fail")
    expect(classifyRun({ bunExitCode: 123, output: RED_SUMMARY })).toBe("fail")
    expect(classifyRun({ bunExitCode: 139, output: RED_SUMMARY })).toBe("fail")
  })

  test("OOM/SIGKILL (137) with no summary is a crash", () => {
    expect(classifyRun({ bunExitCode: 137, output: "" })).toBe("crash")
  })

  test("SIGTERM (143) and SIGSEGV (139) with no summary are crashes", () => {
    const partialLog = "[run-workspace-tests] pkg: running 3 selected test file(s)"
    expect(classifyRun({ bunExitCode: 143, output: partialLog })).toBe("crash")
    expect(classifyRun({ bunExitCode: 139, output: partialLog })).toBe("crash")
  })

  test("exit 1 with no summary is a genuine failure (fail-closed), not a crash", () => {
    const structural = "error: Cannot find module './missing'\n    at <anonymous>"
    expect(classifyRun({ bunExitCode: 1, output: structural })).toBe("fail")
  })

  test("xargs signal death (125) with no summary is a crash", () => {
    expect(classifyRun({ bunExitCode: 125, output: "" })).toBe("crash")
    const partialLog = "[run-workspace-tests] pkg: running 3 selected test file(s)"
    expect(classifyRun({ bunExitCode: 125, output: partialLog })).toBe("crash")
  })

  test("xargs signal death (125) WITH a red summary is a genuine failure", () => {
    expect(classifyRun({ bunExitCode: 125, output: RED_SUMMARY })).toBe("fail")
  })

  test("xargs exit 125 after a green summary is a pass", () => {
    expect(classifyRun({ bunExitCode: 125, output: GREEN_SUMMARY })).toBe("pass")
  })

  test("summary present but no parseable fail line, non-zero exit, is a failure", () => {
    expect(classifyRun({ bunExitCode: 7, output: "Ran 10 tests across 2 files. [1.0s]" })).toBe(
      "fail"
    )
  })
})

describe("parseBunSummary", () => {
  test("detects summary presence and fail tallies", () => {
    const parsed = parseBunSummary(GREEN_SUMMARY)
    expect(parsed.hasSummary).toBe(true)
    expect(parsed.failTotals).toEqual([0])
  })

  test("reports no summary when none is present", () => {
    expect(parseBunSummary("error: boom").hasSummary).toBe(false)
  })

  test("extracts a non-zero fail tally", () => {
    expect(parseBunSummary(RED_SUMMARY).failTotals).toEqual([3])
  })

  test("reports how many files the summary says ran", () => {
    expect(parseBunSummary(GREEN_SUMMARY).filesRan).toBe(51)
  })

  test("sums the file counts across summary blocks (xargs arg-split)", () => {
    expect(parseBunSummary(`${GREEN_SUMMARY}\n${RED_SUMMARY}`).filesRan).toBe(102)
  })

  test("parses the singular `1 file` spelling", () => {
    expect(parseBunSummary("Ran 5 tests across 1 file. [0.5s]").filesRan).toBe(1)
  })

  test("reports a null file count when there is no summary", () => {
    expect(parseBunSummary("error: boom").filesRan).toBeNull()
  })
})

describe("underRanReport — a shard that did not execute what it was handed", () => {
  test("no summary at all, with files selected, is an under-run", () => {
    expect(underRanReport("bun test v1.3.14 (0d9b296a)\n", 4)).toEqual({ expected: 4, ran: null })
  })

  test("fewer files reported than were selected is an under-run", () => {
    expect(underRanReport("Ran 2 tests across 2 files. [1.0s]", 4)).toEqual({ expected: 4, ran: 2 })
  })

  test("every selected file accounted for is no under-run", () => {
    expect(underRanReport("Ran 9 tests across 3 files. [1.0s]", 3)).toBeNull()
  })

  test("summaries summed across an xargs split cover the whole selection", () => {
    const split = "Ran 2 tests across 2 files. [1.0s]\nRan 3 tests across 3 files. [1.0s]"
    expect(underRanReport(split, 5)).toBeNull()
  })

  test("no expectation given leaves the verdict where it was", () => {
    expect(underRanReport("bun test v1.3.14 (0d9b296a)\n", null)).toBeNull()
  })

  test("the under-run code is distinct from the crash code, which asks for an isolated re-run", () => {
    expect(UNDER_RAN_EXIT_CODE).not.toBe(CRASH_EXIT_CODE)
  })
})
