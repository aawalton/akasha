
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { existsSync, readFileSync, rmSync } from "node:fs"
import { emailRulesCover } from "../audits/email-rules-cover.ts"
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

function covering(): void {
  at.put(
    "pages/email-rule-code/alan/receipts.md",
    rule(`${condition("from", "is", "a@example.com")}${condition("subject", "contains", "receipt")}`)
  )
  at.put(
    "pages/email-rule-agent/alan/sender-other.md",
    rule(
      `${condition("from", "is", "a@example.com")}${condition("subject", "does not contain", "receipt")}`,
      ""
    )
  )
  at.put("pages/email-rule-agent/alan/rest.md", rule(condition("from", "is not", "a@example.com"), ""))
}

describe("a rule set that names one sender and nothing else", () => {
  test("is refused, mail from anyone else reaching no rule at all", () => {
    at.put("pages/email-rule-code/alan/one.md", rule(condition("from", "is", "a@example.com")))
    const outcome = emailRulesCover(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages[0]).toContain("pages/email-rule-code/alan")
    expect(outcome.messages[0]).not.toContain("a@example.com")
  })
})

describe("a subject split between two rules under one sender", () => {
  test("passes, every message answering one side of the split or the other", () => {
    covering()
    expect(emailRulesCover(repo()).verdict).toBe("pass")
  })

  test("is refused once one of the two is taken away", () => {
    covering()
    rmSync(`${at.root}/pages/email-rule-agent/alan/sender-other.md`)
    const outcome = emailRulesCover(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages[0]).toContain("a@example.com")
  })

  test("is refused once the residual rule is taken away", () => {
    covering()
    rmSync(`${at.root}/pages/email-rule-agent/alan/rest.md`)
    expect(emailRulesCover(repo()).verdict).toBe("fail")
  })
})

describe("a rule matching everything", () => {
  test("covers the whole space on its own", () => {
    at.put("pages/email-rule-agent/alan/everything.md", rule("", ""))
    expect(emailRulesCover(repo()).verdict).toBe("pass")
  })
})

describe("a value added to a residual rule and to nothing else", () => {
  test("is refused, the mail it takes out landing nowhere", () => {
    at.put("pages/email-rule-agent/alan/rest.md", rule(condition("subject", "does not contain", "invoice"), ""))
    expect(emailRulesCover(repo()).verdict).toBe("fail")
  })
})

describe("what the reader could not examine", () => {
  test("is refused rather than read as a rule matching nothing", () => {
    at.put("pages/email-rule-code/alan/muddled.md", rule("- from ends with example.com\n"))
    const outcome = emailRulesCover(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages[0]).toContain("pages/email-rule-code/alan/muddled.md")
  })
})

describe("the population", () => {
  test("counts the messages decided, so an empty walk cannot report a clean rule set", () => {
    expect(emailRulesCover(repo()).verdict).toBe("not-applicable")
    expect(emailRulesCover(repo()).population.measured).toBe(0)
    at.put("pages/email-rule-agent/alan/everything.md", rule("", ""))
    expect(emailRulesCover(repo()).population.measured).toBe(1)
  })
})
