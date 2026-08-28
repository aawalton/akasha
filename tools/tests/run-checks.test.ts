import { describe, expect, test } from "bun:test"
import type { CheckOutcome, RepoView, Levy } from "../lib/check.ts"
import { anyRefused, over, type Outcome } from "../../outcome/outcome.ts"
import type { Repo } from "../../page/document/types.ts"
import { resolve } from "node:path"
import { SUITE, runChecks, suitePassed, within } from "../run-checks.ts"
import { report, tallyOf } from "../audits/suite-runs.ts"
import { CEILING_MS } from "../lib/run-cost.ts"

function repoViewOf(repo: Repo): RepoView {
  return {
    roots: { akasha: "/nonexistent-akasha", "code-editor": "/nonexistent-code-editor" },
    name: repo,
    documents: [],
    read: () => "",
    exists: () => false,
  }
}

function watcher(name: string, walked: Repo[], measured = 1): Levy["run"] {
  return (repo): CheckOutcome => {
    walked.push(repo.name)
    return {
      name,
      verdict: "pass",
      detail: `walked ${repo.name}`,
      messages: [],
      population: over(measured, "document(s)"),
    }
  }
}

describe("a check levied over one repo", () => {
  test("is run once, over that repo, and names it anyway", async () => {
    const walked: Repo[] = []
    const outcomes = await runChecks({ one: { repos: ["code-editor"], run: watcher("one", walked) } }, repoViewOf, [])
    expect(walked).toEqual(["code-editor"])
    expect(outcomes).toHaveLength(1)
    expect(outcomes[0]?.name).toBe("one (code-editor)")
    expect(outcomes[0]?.detail).toBe("walked code-editor")
  })
})

describe("a check levied over several repos", () => {
  test("is run once per repo, in the order declared", async () => {
    const walked: Repo[] = []
    await runChecks({ both: { repos: ["code-editor", "akasha"], run: watcher("both", walked) } }, repoViewOf, [])
    expect(walked).toEqual(["code-editor", "akasha"])
  })

  test("names each run by its repo, two outcomes being indistinguishable otherwise", async () => {
    const outcomes = await runChecks(
      { both: { repos: ["akasha", "code-editor"], run: watcher("both", []) } },
      repoViewOf,
      []
    )
    expect(outcomes.map((outcome) => outcome.name)).toEqual(["both (akasha)", "both (code-editor)"])
  })
})

describe("a check that measured nothing", () => {
  test("fails rather than passing over an empty search space", async () => {
    const outcomes = await runChecks(
      { empty: { repos: ["akasha"], run: watcher("empty", [], 0) } },
      repoViewOf,
      []
    )
    expect(outcomes[0]?.verdict).toBe("fail")
    expect(outcomes[0]?.messages).not.toHaveLength(0)
  })

  test("names the repo its search was empty over", async () => {
    const outcomes = await runChecks(
      { empty: { repos: ["code-editor"], run: watcher("empty", [], 0) } },
      repoViewOf,
      []
    )
    expect(outcomes[0]?.messages.join("")).toContain("empty (code-editor)")
  })

  test("passes once the same check reaches something", async () => {
    const outcomes = await runChecks(
      { full: { repos: ["akasha"], run: watcher("full", [], 3) } },
      repoViewOf,
      []
    )
    expect(outcomes[0]?.verdict).toBe("pass")
  })
})

describe("a name no levy carries", () => {
  test("fails rather than passing silently, and says what there is", async () => {
    const outcomes = await runChecks({ one: { repos: ["akasha"], run: watcher("one", []) } }, repoViewOf, ["two"])
    expect(outcomes).toHaveLength(1)
    expect(outcomes[0]?.verdict).toBe("fail")
    expect(outcomes[0]?.messages.join("")).toContain("one")
  })
})

const ROOT = resolve(import.meta.dir, "..", "..")

function hereViewOf(repo: Repo): RepoView {
  const view = repoViewOf(repo)
  return { ...view, roots: { ...view.roots, akasha: ROOT } }
}

describe("the ceiling on a whole run", () => {
  const stepping = (steps: readonly number[]): (() => number) => {
    let at = -1
    return () => {
      at += 1
      return steps[Math.min(at, steps.length - 1)] as number
    }
  }

  test("a run inside its ceiling adds no verdict of its own", async () => {
    const outcomes = await runChecks(
      { one: { repos: ["akasha"], run: watcher("one", []) } },
      hereViewOf,
      [],
      30_000,
      stepping([0, 29_999])
    )
    expect(outcomes.map((outcome) => outcome.name)).toEqual(["one (akasha)"])
  })

  test("a run past its ceiling fails on the elapsed time, whatever every check found", async () => {
    const outcomes = await runChecks(
      { one: { repos: ["akasha"], run: watcher("one", []) } },
      hereViewOf,
      [],
      30_000,
      stepping([0, 45_000])
    )
    expect(outcomes.map((outcome) => outcome.name)).toEqual(["one (akasha)", "checks-ceiling"])
    expect(outcomes[0]?.verdict).toBe("pass")
    expect(outcomes[1]?.verdict).toBe("fail")
    expect(outcomes[1]?.detail).toBe("45.0s against a 30s ceiling")
    expect(outcomes[1]?.messages.join("")).toContain("45.0s against a ceiling of 30s")
  })

  test("every check is handed the deadline the run is bounded by", async () => {
    const seen: Array<number | undefined> = []
    await runChecks(
      {
        one: {
          repos: ["akasha"],
          run: (repo) => {
            seen.push(repo.deadlineAt)
            return { name: "one", verdict: "pass" as const, detail: "", messages: [], population: over(1, "document(s)") }
          },
        },
      },
      hereViewOf,
      [],
      30_000,
      stepping([1_000, 1_000])
    )
    expect(seen).toEqual([31_000])
  })
})

describe("the mark that says which commit the suite was last green on", () => {
  const GREEN_RUN =
    "bun test v1.3.14\n\n 822 pass\n 0 fail\nRan 822 tests across 55 files. [8.91s]\n"

  const FAILING_RUN =
    "bun test v1.3.14\n\n(fail) the command > refuses a body it cannot gate\n 820 pass\n 2 fail\nRan 822 tests across 55 files. [9.02s]\n"

  const banded = (outcome: CheckOutcome, elapsedMs: number): Outcome =>
    within({ ...outcome, name: SUITE, elapsedMs }, "slow")

  const PAST_THE_BAND = CEILING_MS.slow + 1

  const INSIDE_THE_BAND = 1

  test("advances on a run whose only defect is the band, the run still failing on it", () => {
    const outcome = banded(report(tallyOf(GREEN_RUN, 0), 55, ROOT), PAST_THE_BAND)
    expect(anyRefused([outcome])).toBe(true)
    expect(outcome.detail).toContain("slow ceiling")
    expect(suitePassed([outcome])).toBe(true)
  })

  test("stays where it is when a test failed, however far inside the band the run was", () => {
    expect(suitePassed([banded(report(tallyOf(FAILING_RUN, 1), 55, ROOT), INSIDE_THE_BAND)])).toBe(false)
  })

  test("stays where it is when the run never reached every file it asked for, band or no band", () => {
    expect(suitePassed([banded(report(tallyOf(GREEN_RUN, 0), 100, ROOT), PAST_THE_BAND)])).toBe(false)
    expect(suitePassed([banded(report(tallyOf(GREEN_RUN, 0), 100, ROOT), INSIDE_THE_BAND)])).toBe(false)
  })
})
