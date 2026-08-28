import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { pagesHoldShape } from "../audits/pages-hold-shape.ts"
import type { RepoView } from "../lib/check.ts"

const HERE = new URL("../../", import.meta.url).pathname

/**
 * How long the audit over the whole repository is given.
 *
 * The standard suite forbids a test its own ceiling and holds every case to five seconds; an
 * on-demand file is outside that, which is the only reason this may be stated at all.
 */
const CEILING_MS = 60_000

/**
 * This repository itself, named as the one repository the pages stand in.
 *
 * OVER THE LIVE TREE, WHICH IS WHY THIS IS ON DEMAND. What a fixture cannot show is a check that
 * reaches nothing real: globs that stop matching the paths pages actually take leave every page
 * unclaimed, and a skip over the whole repository reports as green. Only the live tree catches
 * that. Every page now stands in `akasha`, so the audit measures some 59,000 pages and spends
 * about twelve seconds doing it.
 */
function liveView(documents: readonly string[]): RepoView {
  return {
    roots: { akasha: HERE },
    name: "akasha",
    documents,
    read: (relPath) => readFileSync(`${HERE}${relPath}`, "utf8"),
    exists: () => true,
  }
}

describe("the check over a tree it does reach", () => {
  test(
    "pages-hold-shape judges rather than skipping, over the pages this repo claims",
    () => {
      const outcome = pagesHoldShape(liveView([]))
      expect(outcome.verdict).not.toBe("not-applicable")
      expect(outcome.population.measured).toBeGreaterThan(0)
    },
    CEILING_MS
  )
})
