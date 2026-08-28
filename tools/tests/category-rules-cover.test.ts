import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { categoryRulesCover } from "../audits/category-rules-cover.ts"
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

describe("a rule narrowing its merchant", () => {
  const elsewhere = (): void => {
    at.put(
      "pages/category-rule-code/elsewhere.md",
      rule(condition("merchant", "is not", "netflix"), "decides: person")
    )
    at.put(
      "pages/category-rule-code/narrow.md",
      rule(`${condition("merchant", "is", "netflix")}${condition("sign", "is", "negative")}`)
    )
  }

  test("is refused where nothing claims the rest of that merchant", () => {
    elsewhere()
    const outcome = categoryRulesCover(repo())
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages[0]).toContain("netflix")
  })

  test("passes once a rule claims that rest and hands it to a person", () => {
    elsewhere()
    at.put(
      "pages/category-rule-code/rest.md",
      rule(`${condition("merchant", "is", "netflix")}${condition("sign", "is not", "negative")}`, "decides: person")
    )
    expect(categoryRulesCover(repo()).verdict).toBe("pass")
  })
})

describe("a merchant no rule names at all", () => {
  test("is refused, the vocabulary being what the walk can pose", () => {
    at.put("pages/category-rule-code/one.md", rule(condition("merchant", "is", "netflix")))
    const outcome = categoryRulesCover(repo())
    expect(outcome.verdict).toBe("fail")
  })
})

describe("the population", () => {
  test("counts the transactions decided, so an empty walk cannot report a covered rule set", () => {
    expect(categoryRulesCover(repo()).verdict).toBe("not-applicable")
    expect(categoryRulesCover(repo()).population.measured).toBe(0)
    at.put("pages/category-rule-code/one.md", rule(condition("merchant", "is", "netflix")))
    expect(categoryRulesCover(repo()).population.measured).toBeGreaterThan(0)
  })
})
