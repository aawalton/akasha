import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { pagesHoldShape } from "../audits/pages-hold-shape.ts"
import type { RepoView } from "../lib/check.ts"

const HERE = new URL("../../", import.meta.url).pathname

const CEILING_MS = 60_000

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
