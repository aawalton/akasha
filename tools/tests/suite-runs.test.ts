import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import type { RepoView } from "../lib/check.ts"
import {
  ON_DEMAND_SUFFIX,
  SUITE_MARK,
  added,
  onDemandFiles,
  report,
  suiteRuns,
  tallyOf,
  unitFiles,
} from "../audits/suite-runs.ts"
import { refusalText } from "../../refusal/refusal.ts"

const ROOT = resolve(import.meta.dir, "..", "..")

const says = (slug: string, values: Readonly<Record<string, string>>): string =>
  refusalText(slug, values, ROOT)

const GREEN =
  "bun test v1.3.14\n\n 822 pass\n 0 fail\n 2169 expect() calls\nRan 822 tests across 55 files. [8.91s]\n"

const FAILING =
  "bun test v1.3.14\n\n(fail) the command > refuses a body it cannot gate\n 820 pass\n 2 fail\nRan 822 tests across 55 files. [9.02s]\n"

const NOWHERE = {
  roots: { akasha: "/nonexistent-akasha" },
  name: "akasha",
  documents: [],
  read: () => "",
  exists: () => false,
} as RepoView

describe("the runner's report, read as a verdict", () => {
  test("a green run reaching every file it asked for passes, over the files the runner said it ran", () => {
    const outcome = report(tallyOf(GREEN, 0), 55, ROOT)
    expect(outcome.verdict).toBe("pass")
    expect(outcome.population.measured).toBe(55)
  })

  test("a failing run is judged a failure and carries what failed into the report", () => {
    const outcome = report(tallyOf(FAILING, 1), 55, ROOT)
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(says("suite-failed", { failed: "2", exit: "1" }))
    expect(outcome.messages.join("\n")).toContain("refuses a body it cannot gate")
  })

  test("a run that collected no file certifies nothing, whatever it exited", () => {
    expect(
      report(tallyOf("Ran 0 tests across 0 files. [0.01s]\n", 0), 0, ROOT).population.measured
    ).toBe(0)
  })

  test("output with no summary in it fails rather than passing quietly", () => {
    const outcome = report(tallyOf("error: could not resolve `../lib/gone.ts`\n", 1), 8, ROOT)
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(says("suite-summary-unread", { exit: "1" }))
    expect(outcome.population.measured).toBe(0)
  })

  test("a nonzero exit fails even where the runner counted no failure", () => {
    expect(report(tallyOf(GREEN, 1), 55, ROOT).verdict).toBe("fail")
  })
})

describe("the budget, spent one batch at a time", () => {
  test("a run stopped short of the files it asked for fails, naming how many it never reached", () => {
    const outcome = report(tallyOf(GREEN, 0), 100, ROOT)
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(says("suite-unfinished", { reached: "55", unreached: "45" }))
  })

  test("a run stopped short still reports the files it did reach, rather than discarding them", () => {
    expect(report(tallyOf(GREEN, 0), 100, ROOT).population.measured).toBe(55)
  })

  test("a batch killed at the deadline is reported as killed, not as one that held nothing", () => {
    const killed = tallyOf("", null, 8)
    expect(killed.files).toBe(0)
    expect(killed.killed).toBe(1)
    expect(killed.killedFiles).toBe(8)
  })

  test("a batch that genuinely held nothing is not reported as killed", () => {
    const empty = tallyOf("Ran 0 tests across 0 files. [0.01s]\n", 0, 8)
    expect(empty.killed).toBe(0)
    expect(empty.killedFiles).toBe(0)
  })

  test("a killed batch is named in the report, with the files it took down", () => {
    const outcome = report(added(tallyOf(GREEN, 0, 55), tallyOf("", null, 8)), 100, ROOT)
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toContain(says("suite-batch-killed", { batches: "1", files: "8" }))
  })

  test("a file a killed batch took down is not also counted as one never started", () => {
    const outcome = report(added(tallyOf(GREEN, 0, 55), tallyOf("", null, 8)), 100, ROOT)
    expect(outcome.messages).toContain(says("suite-unfinished", { reached: "55", unreached: "37" }))
  })

  test("the one line a reader of the summary sees says a batch did not come back", () => {
    const outcome = report(added(tallyOf(GREEN, 0, 55), tallyOf("", null, 8)), 100, ROOT)
    expect(outcome.detail).toContain(
      "1 batch(es) killed at the deadline taking 8 file(s) with them"
    )
  })

  test("killed batches add up across a run, as every other count does", () => {
    const both = added(tallyOf("", null, 8), tallyOf("", null, 5))
    expect(both.killed).toBe(2)
    expect(both.killedFiles).toBe(13)
  })

  test("what a killed batch printed before it died is still carried into the report", () => {
    const outcome = report(
      added(tallyOf(GREEN, 0), tallyOf("(fail) a thing > came apart\n", null)),
      100,
      ROOT
    )
    expect(outcome.messages.join("\n")).toContain("a thing > came apart")
  })

  test("batches add up, so the report covers the whole run rather than its last part", () => {
    const both = added(tallyOf(GREEN, 0), tallyOf(FAILING, 1))
    expect(both.files).toBe(110)
    expect(both.tests).toBe(1644)
    expect(both.failed).toBe(2)
    expect(both.worstExit).toBe(1)
  })
})

describe("the recursion bound", () => {
  test("the check stands down where the mark is already set, rather than starting a second suite", async () => {
    const before = process.env[SUITE_MARK]
    process.env[SUITE_MARK] = "1"
    try {
      expect((await suiteRuns(NOWHERE)).verdict).toBe("not-applicable")
    } finally {
      if (before === undefined) delete process.env[SUITE_MARK]
      else process.env[SUITE_MARK] = before
    }
  })
})

describe("what the standard suite collects", () => {
  const planted = (names: readonly string[]): string => {
    const root = mkdtempSync(join("/var/tmp", "suite-collects-"))
    mkdirSync(join(root, "tools", "tests"), { recursive: true })
    for (const name of names) writeFileSync(join(root, "tools", "tests", name), "")
    return root
  }

  test("an on-demand test is left out, whatever it sits beside", () => {
    const root = planted(["a.test.ts", "b.on-demand.test.ts", "c.test.ts"])
    try {
      expect(unitFiles(root)).toEqual(["tools/tests/a.test.ts", "tools/tests/c.test.ts"])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a tree of nothing but held-back tests collects nothing, rather than falling back to all of them", () => {
    const root = planted(["a.on-demand.test.ts"])
    try {
      expect(unitFiles(root)).toEqual([])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("the standard suite of this repo is what it collects, and every one of them is a test file", () => {
    const collected = unitFiles(ROOT)
    expect(collected.length).toBeGreaterThan(0)
    expect(collected.every((path) => path.endsWith(".test.ts"))).toBe(true)
    expect(collected.some((path) => path.endsWith(".on-demand.test.ts"))).toBe(false)
  })

  test("a held-back test is named by the runner that exists to run it, because one nothing runs is deleted rather than held", () => {
    const root = planted(["a.test.ts", `b${ON_DEMAND_SUFFIX}`])
    try {
      expect(onDemandFiles(root)).toEqual([`tools/tests/b${ON_DEMAND_SUFFIX}`])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("no file is both collected and held back, the two sets being what the suffix divides", () => {
    const collected = unitFiles(ROOT)
    const held = onDemandFiles(ROOT)
    expect(held.length).toBeGreaterThan(0)
    expect(collected.filter((path) => held.includes(path))).toEqual([])
  })
})
