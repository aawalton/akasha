
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { emailRulesDisjoint } from "../audits/email-rules-disjoint.ts"
import type { RepoView } from "../lib/check.ts"
import { fixture, type Fixture } from "./fixture.ts"
import { emailRuleStore } from "./rules-fixture.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

let at: Fixture

beforeEach(() => {
  at = fixture()
  emailRuleStore(at)
})
afterEach(() => at.dispose())

function rule(match: string, frontmatter = "actions:\n  - archive"): string {
  return `---\n${frontmatter}\n---\n\n# Match\n\n${match}`
}

const condition = (field: string, test: string, ...values: readonly string[]): string =>
  `- **${field}** ${test}\n${values.map((one) => `  - \`${one}\`\n`).join("")}`

function repo(): RepoView {
  const documents: string[] = []
  for (const relPath of new Bun.Glob("**/*.md").scanSync({ cwd: at.root })) documents.push(relPath)
  return {
    roots: rootsNamed({ akasha: at.root }),
    name: "akasha",
    documents: documents.sort(),
    read: (relPath) => readFileSync(`${at.root}/${relPath}`, "utf8"),
    exists: existsSync,
  }
}

describe("an address under a domain suffix", () => {
  test("is refused, both rules are named, and so is a message they share", () => {
    at.put("pages/email-rule-code/alan/suffix.md", rule(condition("from", "ends with", "vanguard.com")))
    at.put("pages/email-rule-code/alan/exact.md", rule(condition("from", "is", "alerts@vanguard.com")))
    const outcome = emailRulesDisjoint(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toHaveLength(1)
    expect(outcome.messages[0]).toContain("pages/email-rule-code/alan/suffix.md")
    expect(outcome.messages[0]).toContain("pages/email-rule-code/alan/exact.md")
    expect(outcome.messages[0]).toContain("alerts@vanguard.com")
  })

  test("passes once the wider rule gives that address up", () => {
    at.put(
      "pages/email-rule-code/alan/suffix.md",
      rule(`${condition("from", "ends with", "vanguard.com")}${condition("from", "is not", "alerts@vanguard.com")}`)
    )
    at.put("pages/email-rule-code/alan/exact.md", rule(condition("from", "is", "alerts@vanguard.com")))
    expect(emailRulesDisjoint(repo()).verdict).toBe("pass")
  })
})

describe("two rules a subject can satisfy at once", () => {
  test("are refused, one message being able to hold both words", () => {
    at.put(
      "pages/email-rule-code/alan/shipped.md",
      rule(`${condition("from", "ends with", "amazon.com")}${condition("subject", "contains", "shipped")}`)
    )
    at.put(
      "pages/email-rule-code/alan/delivered.md",
      rule(`${condition("from", "ends with", "amazon.com")}${condition("subject", "contains", "delivered")}`)
    )
    expect(emailRulesDisjoint(repo()).verdict).toBe("fail")
  })
})

describe("two rules spelling one value differently in case", () => {
  test("are refused, a condition comparing without regard to case", () => {
    at.put("pages/email-rule-code/alan/capitalised.md", rule(condition("subject", "contains", "Statement")))
    at.put("pages/email-rule-code/alan/lower.md", rule(condition("subject", "contains", "statement")))
    expect(emailRulesDisjoint(repo()).verdict).toBe("fail")
  })
})

describe("a residual rule beside the rules it leaves alone", () => {
  test("passes, a negated condition holding only where none of its values holds", () => {
    at.put("pages/email-rule-code/alan/one.md", rule(condition("from", "is", "a@example.com")))
    at.put("pages/email-rule-code/alan/other.md", rule(condition("from", "is", "b@example.com")))
    at.put(
      "pages/email-rule-agent/alan/rest.md",
      rule(condition("from", "is not", "a@example.com", "b@example.com"), "")
    )
    expect(emailRulesDisjoint(repo()).verdict).toBe("pass")
  })

  test("is refused where it forgot one of them", () => {
    at.put("pages/email-rule-code/alan/one.md", rule(condition("from", "is", "a@example.com")))
    at.put("pages/email-rule-code/alan/other.md", rule(condition("from", "is", "b@example.com")))
    at.put("pages/email-rule-agent/alan/rest.md", rule(condition("from", "is not", "a@example.com"), ""))
    const outcome = emailRulesDisjoint(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages[0]).toContain("b@example.com")
  })
})

describe("a rule matching everything", () => {
  test("is refused beside any other rule, a match with no conditions claiming every message", () => {
    at.put("pages/email-rule-agent/alan/everything.md", rule("", ""))
    at.put("pages/email-rule-code/alan/narrow.md", rule(condition("subject", "contains", "receipt")))
    expect(emailRulesDisjoint(repo()).verdict).toBe("fail")
  })
})

describe("what the reader could not examine", () => {
  test("is refused rather than read as a rule matching nothing", () => {
    at.put("pages/email-rule-code/alan/muddled.md", rule("- from ends with example.com\n"))
    const outcome = emailRulesDisjoint(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages[0]).toContain("pages/email-rule-code/alan/muddled.md")
  })
})

describe("the population", () => {
  test("counts the messages decided, so an empty walk cannot report a clean rule set", () => {
    expect(emailRulesDisjoint(repo()).verdict).toBe("not-applicable")
    expect(emailRulesDisjoint(repo()).population.measured).toBe(0)
    at.put("pages/email-rule-code/alan/one.md", rule(condition("from", "is", "a@b.com")))
    expect(emailRulesDisjoint(repo()).population.measured).toBe(2)
  })
})
