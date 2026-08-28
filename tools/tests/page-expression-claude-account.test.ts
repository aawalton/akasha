import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { deriver } from "../lib/page-derive.ts"
import { type Held } from "../lib/page-file-values"
import { evaluate } from "../lib/page-expression.ts"
import { ExpressionRefused } from "../lib/page-expression-value.ts"
import { answer } from "../lib/page-query.ts"
import type { Roots } from "../../page/page"

const landed = (slug: string): string => {
  const path = join(import.meta.dir, "..", "..", "pages", "page-property-definition", `${slug}.page-property-definition.md`)
  const found = /^expression: (.+)$/m.exec(readFileSync(path, "utf8"))
  if (found === null) throw new Error(`\`${slug}\` states no expression to test`)
  return found[1]
}

const SESSION = landed("claude-account-effective-five-hour-percent-used")

const WEEKLY = landed("claude-account-effective-seven-day-percent-used")

const reading =
  (values: Readonly<Record<string, Held>>) =>
  (key: string): Held =>
    values[key] ?? null

const refusal = (expression: string, values: Readonly<Record<string, Held>> = {}): string => {
  try {
    evaluate(expression, reading(values))
  } catch (why) {
    if (why instanceof ExpressionRefused) return why.message
    throw why
  }
  throw new Error(`\`${expression}\` was evaluated where a refusal was due`)
}

describe("the expression a value-selecting `&&` and `||` compose", () => {
  it("takes the right side of `&&` where the test holds", () => {
    expect(evaluate(SESSION, reading({ "seven-day-percent-used": "100", "five-hour-percent-used": "5" }))).toBe("100")
  })

  it("takes the right side of `||` where the test fails", () => {
    expect(evaluate(SESSION, reading({ "seven-day-percent-used": "50", "five-hour-percent-used": "25" }))).toBe("25")
  })

  it("takes the right side of `||` where the left is a zero rather than reading the zero as an answer", () => {
    expect(evaluate(SESSION, reading({ "seven-day-percent-used": "40", "five-hour-percent-used": "0" }))).toBe("0")
  })

  it("carries a missing test through as nothing, so the fallback still answers", () => {
    expect(evaluate(SESSION, reading({ "five-hour-percent-used": "30" }))).toBe("30")
  })

  it("answers nothing where every side reaches nothing", () => {
    expect(evaluate(SESSION, reading({}))).toBeNull()
  })

  it("reads `>=` as a bound met at the bound itself", () => {
    expect(evaluate("prop(a) >= 100", reading({ a: "100" }))).toBe("true")
    expect(evaluate("prop(a) >= 100", reading({ a: "99.9" }))).toBe("false")
  })

  it("groups by parentheses rather than by the order the operators stand in", () => {
    expect(evaluate("(1 || 2) && prop(a)", reading({ a: "7" }))).toBe("7")
  })
})

describe("a key standing for a reason rather than a number", () => {
  it("reads a reason that stands as the account being disabled, whatever it says", () => {
    const values = { "subscription-disabled-reason": "withdrawn", "five-hour-percent-used": "5" }
    expect(evaluate(SESSION, reading(values))).toBe("100")
    expect(evaluate(WEEKLY, reading({ ...values, "seven-day-percent-used": "8" }))).toBe("100")
  })

  it("reads an absent reason as the account standing", () => {
    expect(evaluate(WEEKLY, reading({ "seven-day-percent-used": "8" }))).toBe("8")
  })

  it("reads a blank reason as the account standing", () => {
    expect(
      evaluate(WEEKLY, reading({ "subscription-disabled-reason": "", "seven-day-percent-used": "8" }))
    ).toBe("8")
  })

  it("refuses a reason the two evaluators would read as different kinds of value", () => {
    expect(refusal(WEEKLY, { "subscription-disabled-reason": "false" })).toBe(
      "`subscription-disabled-reason` holds `false`, which is a word to a file and a boolean to the database, and this evaluator will not pick"
    )
  })
})

describe("how an expression names a key", () => {
  it("names a kebab-case key through `prop(...)`, which stops at the closing bracket", () => {
    expect(evaluate("prop(seven-day-percent-used)", reading({ "seven-day-percent-used": "8" }))).toBe("8")
  })

  it("names three kebab-case keys in one expression without any of them running into another", () => {
    const values = {
      "subscription-disabled-reason": "",
      "seven-day-percent-used": "100",
      "five-hour-percent-used": "5",
    }
    expect(evaluate(SESSION, reading(values))).toBe("100")
  })

  it("reads a kebab-case key written bare as a chain of subtractions, so the value it holds is never looked up", () => {
    expect(evaluate("seven-day-percent-used >= 100", reading({ "seven-day-percent-used": "100" }))).toBe("false")
  })

  it("names a camel-case key bare, as the keys carrying expressions already do", () => {
    expect(evaluate("totalLengthInWords", reading({ totalLengthInWords: "40" }))).toBe("40")
  })
})

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
  const root = mkdtempSync(join("/var/tmp", "page-expression-"))
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
    const rows = found.rows("claude-account")
    expect(rows?.every((row) => row.values.broken === null)).toBe(true)
    expect(found.faults()).toContain(
      "`claude-account-broken` states an `expression` this evaluator refuses: `min` reads 2 arguments, and 1 stands here"
    )
  })
})
