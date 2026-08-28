import { describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { pagesHoldProperties } from "../audits/pages-hold-properties.ts"
import type { RepoView } from "../lib/check.ts"
import type { Repo } from "../../page/document/types.ts"

const HERE = new URL("../../", import.meta.url).pathname.replace(/\/$/, "")

const CLAIMED = "pages/domain/global.domain.md"

const INVENTED = "not-a-property-of-anything"

const UNCLAIMABLE = "no-such-repo"

function rootsAt(akasha: string): RepoView["roots"] {
  return { akasha, [UNCLAIMABLE]: `/nonexistent-${UNCLAIMABLE}` }
}

function viewOf(bend: (body: string) => string = (body) => body, name: Repo = "akasha"): RepoView {
  return {
    roots: rootsAt(HERE),
    name,
    documents: [],
    read: (relPath) => {
      const body = readFileSync(`${HERE}/${relPath}`, "utf8")
      return relPath === CLAIMED ? bend(body) : body
    },
    exists: existsSync,
  }
}

const claimed = pagesHoldProperties(viewOf())

describe("pages-hold-properties over the pages this repo claims", () => {
  test("sweeps a population it states, which is what no gate on a write can report", () => {
    const outcome = claimed
    expect(outcome.verdict).not.toBe("not-applicable")
    expect(outcome.population.measured).toBeGreaterThan(0)
    expect(outcome.population.unit).toBe("claimed page(s)")
  })

  test("says nothing about a key no page carries, so a finding below is the drift and not the sweep", () => {
    expect(claimed.messages.join("\n")).not.toContain(INVENTED)
  })
})

const withInvented = (body: string) => body.replace(/^---\n/, `---\n${INVENTED}: x\n`)
const invented = pagesHoldProperties(viewOf(withInvented))

describe("a page carrying a key no property declares", () => {
  test("is reported, which is the drift a gate on writes never revisits", () => {
    const outcome = invented
    expect(outcome.verdict).toBe("advisory")
    expect(outcome.messages.join("\n")).toContain(INVENTED)
  })

  test("is named by its path, so the report says which page to open", () => {
    expect(invented.messages.join("\n")).toContain(CLAIMED)
  })
})

const missingRequired = pagesHoldProperties(
  viewOf((body) => body.replace(/^domain-parent-slug:.*\n/m, ""))
)

describe("a page missing a property its page type requires", () => {
  test("is reported, a required key being absent where a wrong one is present", () => {
    const outcome = missingRequired
    expect(outcome.verdict).toBe("advisory")
    expect(outcome.messages.join("\n")).toContain("domain-parent-slug")
  })
})

const unclaimed = pagesHoldProperties(viewOf((body) => body, UNCLAIMABLE))

describe("pages-hold-properties over a repo no page type claims", () => {
  test("says it does not apply and why, rather than certifying an empty sweep", () => {
    const outcome = unclaimed
    expect(outcome.verdict).toBe("not-applicable")
    expect(outcome.population.measured).toBe(0)
    expect(outcome.detail).toContain(`no page type names ${UNCLAIMABLE}`)
  })
})
