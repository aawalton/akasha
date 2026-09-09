import { describe, expect, test } from "bun:test"
import {
  deriveWatcherBuildVerdict,
  readReportedBuild,
  summarizeWatcherBuild,
} from "./watcher-build-status.module.code.ts"

const DEPLOYED = "e4fbe0d2241bb84ec61548f080e810789fe0bd9b"
const OLDER = "c5ea8376f6d0a1b2c3d4e5f60718293a4b5c6d7e"
const REPORTED_AT = "2026-07-25T11:49:33.635Z"

function input(over: Partial<Parameters<typeof deriveWatcherBuildVerdict>[0]> = {}) {
  return {
    targetVersion: DEPLOYED,
    reportedVersion: DEPLOYED,
    reportedAt: REPORTED_AT,
    ...over,
  }
}

describe("the two verdicts that are actually decidable", () => {
  test("same stamp on both sides is current", () => {
    expect(deriveWatcherBuildVerdict(input())).toBe("current")
  })

  test("a different stamp on both sides is stale", () => {
    expect(deriveWatcherBuildVerdict(input({ reportedVersion: OLDER }))).toBe("stale")
  })
})

describe("cannot-determine: never a false stale", () => {
  test('a source runtime reporting "dev" is source-build, NOT stale', () => {
    expect(deriveWatcherBuildVerdict(input({ reportedVersion: "dev" }))).toBe("source-build")
  })

  test("a watcher that has never reported is never-reported, NOT stale", () => {
    expect(deriveWatcherBuildVerdict(input({ reportedVersion: null, reportedAt: null }))).toBe(
      "never-reported"
    )
  })

  test("an absent deployed version is target-unknown, NOT stale", () => {
    expect(deriveWatcherBuildVerdict(input({ targetVersion: null }))).toBe("target-unknown")
  })

  test("an empty deployed version is target-unknown, NOT current and NOT stale", () => {
    expect(deriveWatcherBuildVerdict(input({ targetVersion: "" }))).toBe("target-unknown")
    expect(deriveWatcherBuildVerdict(input({ targetVersion: "", reportedVersion: "" }))).toBe(
      "never-reported"
    )
  })

  test("a blank-whitespace stamp on either side is not a comparable value", () => {
    expect(deriveWatcherBuildVerdict(input({ targetVersion: "   " }))).toBe("target-unknown")
    expect(deriveWatcherBuildVerdict(input({ reportedVersion: "  " }))).toBe("never-reported")
  })
})

describe("precedence when more than one gap holds", () => {
  test("never-reported outranks target-unknown", () => {
    expect(
      deriveWatcherBuildVerdict({ targetVersion: null, reportedVersion: null, reportedAt: null })
    ).toBe("never-reported")
  })

  test("source-build outranks target-unknown", () => {
    expect(
      deriveWatcherBuildVerdict({
        targetVersion: null,
        reportedVersion: "dev",
        reportedAt: REPORTED_AT,
      })
    ).toBe("source-build")
  })
})

describe("readReportedBuild tolerates whatever the exe wrote", () => {
  test("lifts a well-formed report", () => {
    expect(readReportedBuild({ watcherVersion: OLDER, reportedAt: REPORTED_AT })).toEqual({
      reportedVersion: OLDER,
      reportedAt: REPORTED_AT,
    })
  })

  test("keeps unknown sibling fields harmless", () => {
    expect(
      readReportedBuild({ watcherVersion: OLDER, reportedAt: REPORTED_AT, operations: [], odd: 1 })
    ).toEqual({ reportedVersion: OLDER, reportedAt: REPORTED_AT })
  })

  const unreadable: readonly (readonly [string, unknown])[] = [
    ["an absent property", undefined],
    ["a null property", null],
    ["a string", "not-an-object"],
    ["a number", 42],
    ["an array", []],
    ["an empty object", {}],
  ]

  for (const [label, value] of unreadable) {
    test(`degrades ${label} to a cannot-determine input`, () => {
      expect(readReportedBuild(value)).toEqual({ reportedVersion: null, reportedAt: null })
    })
  }

  test("a report carrying no version keeps its instant and still cannot be compared", () => {
    expect(readReportedBuild({ reportedAt: REPORTED_AT })).toEqual({
      reportedVersion: null,
      reportedAt: REPORTED_AT,
    })
    expect(
      summarizeWatcherBuild({
        targetVersion: DEPLOYED,
        ...readReportedBuild({ reportedAt: REPORTED_AT }),
      }).verdict
    ).toBe("never-reported")
  })

  test("an unusable instant reads as unknown, never as 1970", () => {
    expect(readReportedBuild({ watcherVersion: OLDER, reportedAt: "not a date" })).toEqual({
      reportedVersion: OLDER,
      reportedAt: null,
    })
  })

  test("an absent property lands on never-reported, not stale", () => {
    const build = summarizeWatcherBuild({
      targetVersion: DEPLOYED,
      ...readReportedBuild(undefined),
    })
    expect(build.verdict).toBe("never-reported")
  })

  test('a "dev" report lands on source-build, not stale', () => {
    const build = summarizeWatcherBuild({
      targetVersion: DEPLOYED,
      ...readReportedBuild({ watcherVersion: "dev", reportedAt: REPORTED_AT }),
    })
    expect(build.verdict).toBe("source-build")
  })
})

describe("summarizeWatcherBuild", () => {
  test("carries the inputs through beside the verdict", () => {
    expect(summarizeWatcherBuild(input({ reportedVersion: OLDER }))).toEqual({
      targetVersion: DEPLOYED,
      reportedVersion: OLDER,
      reportedAt: REPORTED_AT,
      verdict: "stale",
    })
  })

  test("exposes no ordering, distance, or comparability beyond the verdict", () => {
    const keys = Object.keys(summarizeWatcherBuild(input({ reportedVersion: OLDER }))).sort()
    expect(keys).toEqual(["reportedAt", "reportedVersion", "targetVersion", "verdict"])
  })
})
