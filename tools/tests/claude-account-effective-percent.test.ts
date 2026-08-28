import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { deriver } from "../lib/page-derive.ts"
import { answer } from "../lib/page-query.ts"
import type { Roots } from "../../page/page"

// THE EXPRESSION THAT LANDED IS THE ONE TESTED, read off the property page rather than written
// again here, so a rewrite of it that changes what an account reports fails this rather than
// passing beside it.
const landed = (slug: string): string => {
  const path = join(import.meta.dir, "..", "..", "pages", "page-property-definition", `${slug}.page-property-definition.md`)
  const found = /^expression: (.+)$/m.exec(readFileSync(path, "utf8"))
  if (found === null) throw new Error(`\`${slug}\` states no expression to test`)
  return found[1]
}

const SESSION = landed("claude-account-effective-five-hour-percent-used")

const WEEKLY = landed("claude-account-effective-seven-day-percent-used")

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const account = (lines: readonly string[]): string => page(lines)

const property = (key: string, lines: readonly string[]): string =>
  page([`defined-on-slug: claude-account`, `key: ${key}`, ...lines])

const FIVE = "five-hour-percent-used"
const SEVEN = "seven-day-percent-used"
const REASON = "subscription-disabled-reason"

const PAGES: Readonly<Record<string, string>> = {
  "pages/page-type/claude-account.page-type.md": page(["extends-slug: none"]),
  [`pages/page-property-definition/claude-account-${FIVE}.page-property-definition.md`]: property(FIVE, ["type: number"]),
  [`pages/page-property-definition/claude-account-${SEVEN}.page-property-definition.md`]: property(SEVEN, ["type: number"]),
  [`pages/page-property-definition/claude-account-${REASON}.page-property-definition.md`]: property(REASON, ["type: text"]),
  "pages/page-property-definition/claude-account-effective-five-hour-percent-used.page-property-definition.md": property("effective-five-hour-percent-used", [
    "type: number",
    "computed: true",
    `expression: ${SESSION}`,
  ]),
  "pages/page-property-definition/claude-account-effective-seven-day-percent-used.page-property-definition.md": property("effective-seven-day-percent-used", [
    "type: number",
    "computed: true",
    `expression: ${WEEKLY}`,
  ]),
  "pages/page-property-definition/claude-account-broken.page-property-definition.md": property("broken", ["type: number", "computed: true", "expression: min(1)"]),
}

const rootFor = (pages: Readonly<Record<string, string>>): string => {
  const root = mkdtempSync(join("/var/tmp", "claude-account-effective-"))
  for (const [relPath, text] of Object.entries({ ...PAGES, ...pages })) {
    mkdirSync(join(root, relPath, ".."), { recursive: true })
    writeFileSync(join(root, relPath), text)
  }
  return root
}

// NAMED ONLY WHERE CLONED: every root named here is scanned, so a repo pointed at a path that is
// not there raises ENOENT rather than reading as a repository holding nothing.
const roots = (root: string): Roots => ({ akasha: root })

const PLAIN = rootFor({
  "pages/claude-account/b-second.claude-account.md": account([`${FIVE}: 30`, `${SEVEN}: 40`]),
  "pages/claude-account/a-first.claude-account.md": account([`${FIVE}: 10`, `${SEVEN}: 20`]),
})

const MAXED = rootFor({
  "pages/claude-account/a-maxed.claude-account.md": account([`${FIVE}: 5`, `${SEVEN}: 100`]),
  "pages/claude-account/b-healthy.claude-account.md": account([`${FIVE}: 25`, `${SEVEN}: 50`]),
})

const DISABLED_TOO = rootFor({
  "pages/claude-account/b-second.claude-account.md": account([`${FIVE}: 30`, `${SEVEN}: 40`]),
  "pages/claude-account/a-first.claude-account.md": account([`${FIVE}: 10`, `${SEVEN}: 20`]),
  "pages/claude-account/d-disabled.claude-account.md": account([`${FIVE}: 0`, `${SEVEN}: 0`, `${REASON}: the subscription was withdrawn`]),
})

afterAll(() => {
  for (const root of [PLAIN, MAXED, DISABLED_TOO]) rmSync(root, { recursive: true, force: true })
})

const meanOf = (root: string, target: string): number | null =>
  answer(roots(root), { pageType: "claude-account", function: "mean", target })?.value ?? null

describe("a key a property definition works out with an expression, read through a page query", () => {
  it("carries the five-hour figure where no account has spent its week or lost its subscription", () => {
    expect(meanOf(PLAIN, "effective-five-hour-percent-used")).toBe(20)
    expect(meanOf(PLAIN, "effective-seven-day-percent-used")).toBe(30)
  })

  it("carries 100 for an account whose week is spent, in place of the five-hour figure it reports", () => {
    expect(meanOf(MAXED, "effective-five-hour-percent-used")).toBe(62.5)
    expect(meanOf(MAXED, "effective-seven-day-percent-used")).toBe(75)
  })

  it("carries 100 for a disabled account rather than dropping it from the denominator", () => {
    expect(meanOf(DISABLED_TOO, "effective-five-hour-percent-used")).toBe(140 / 3)
    expect(meanOf(DISABLED_TOO, "effective-seven-day-percent-used")).toBe(160 / 3)
  })

  it("leaves the stored keys reading as the accounts state them, disabled or not", () => {
    expect(meanOf(DISABLED_TOO, FIVE)).toBe(40 / 3)
    expect(meanOf(DISABLED_TOO, SEVEN)).toBe(20)
  })

  it("answers nothing for a key whose expression it refuses, and names the property in a fault", () => {
    const found = deriver(roots(PLAIN))
    const rows = [...found.rows("claude-account")!]
    expect(rows.every((row) => row.values.broken === null)).toBe(true)
    expect(found.faults().join("\n")).toContain("`claude-account-broken` states an `expression` this evaluator refuses")
  })
})
