import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { categoryRulesDisjoint } from "../audits/category-rules-disjoint.ts"
import type { RepoView } from "../lib/check.ts"
import { fixture, type Fixture } from "./fixture.ts"
import { categoryRuleStore } from "./rules-fixture.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

let at: Fixture

beforeEach(() => {
  at = fixture()
  categoryRuleStore(at)
})
afterEach(() => at.dispose())

function rule(match: string, frontmatter = "decides: category\ncategory: House"): string {
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

describe("two rules naming one merchant", () => {
  test("are refused, both named, and so is a transaction they share", () => {
    at.put("pages/category-rule-code/one.md", rule(condition("merchant", "is", "amazon")))
    at.put("pages/category-rule-code/other.md", rule(condition("merchant", "is", "amazon")))
    const outcome = categoryRulesDisjoint(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages).toHaveLength(1)
    expect(outcome.messages[0]).toContain("pages/category-rule-code/one.md")
    expect(outcome.messages[0]).toContain("pages/category-rule-code/other.md")
    expect(outcome.messages[0]).toContain("amazon")
  })
})

describe("a rule matching everything", () => {
  test("is refused beside any other, a match with no conditions claiming every transaction", () => {
    at.put("pages/category-rule-agent/everything.md", rule(""))
    at.put("pages/category-rule-code/narrow.md", rule(condition("merchant", "is", "amazon")))
    expect(categoryRulesDisjoint(repo()).verdict).toBe("fail")
  })
})

describe("the transactions no rule claims", () => {
  test("leave the set disjoint, a transaction nothing matches going to a person", () => {
    at.put("pages/category-rule-code/one.md", rule(condition("merchant", "is", "amazon")))
    at.put("pages/category-rule-code/other.md", rule(condition("merchant", "is", "apple")))
    const outcome = categoryRulesDisjoint(repo())
    expect(outcome.verdict).toBe("pass")
    expect(outcome.population.measured).toBeGreaterThan(2)
  })
})

describe("a rule comparing the description a merchant is spelled out of", () => {
  test("is refused rather than walked, the two being out of step", () => {
    at.put("pages/category-rule-code/raw.md", rule(condition("description", "contains", "amazon")))
    const outcome = categoryRulesDisjoint(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages[0]).toContain("pages/category-rule")
  })
})

describe("what the reader could not examine", () => {
  test("is refused rather than read as a rule matching nothing", () => {
    at.put("pages/category-rule-code/muddled.md", rule("- merchant is amazon\n"))
    const outcome = categoryRulesDisjoint(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages[0]).toContain("pages/category-rule-code/muddled.md")
  })
})

describe("the population", () => {
  test("counts the transactions decided, so an empty walk cannot report a clean rule set", () => {
    expect(categoryRulesDisjoint(repo()).verdict).toBe("not-applicable")
    expect(categoryRulesDisjoint(repo()).population.measured).toBe(0)
    at.put("pages/category-rule-code/one.md", rule(condition("merchant", "is", "amazon")))
    expect(categoryRulesDisjoint(repo()).population.measured).toBeGreaterThan(0)
  })
})
