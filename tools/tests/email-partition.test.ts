import { describe, expect, test } from "bun:test"
import type { Condition } from "../lib/email-rule.ts"
import { eachMessage, describe as describeMessage } from "../lib/email-partition.ts"
import type { Matchable } from "../lib/rules-partition.ts"
import type { Message } from "../lib/gmail.ts"

const condition = (
  field: Condition["field"],
  test: Condition["test"],
  negated: boolean,
  ...values: readonly string[]
): Condition => ({ field, test, negated, values })

const rule = (relPath: string, ...conditions: readonly Condition[]): Matchable => ({
  relPath,
  conditions,
})

function walked(rules: readonly Matchable[]): { message: Message; matched: readonly string[] }[] {
  const seen: { message: Message; matched: readonly string[] }[] = []
  eachMessage(rules, (message, matched) =>
    seen.push({ message, matched: matched.map((one) => one.relPath) })
  )
  return seen
}

describe("a message answering none of the rule set's values", () => {
  test("is posed, that being the mail a residual rule exists to claim", () => {
    const seen = walked([rule("amazon.md", condition("from", "ends with", false, "amazon.com"))])
    expect(seen.some((one) => !one.message.fromAddress.endsWith("amazon.com"))).toBe(true)
    expect(seen.some((one) => one.matched.length === 0)).toBe(true)
  })

  test("is still posed where the rule set names the value the filler is spelled with", () => {
    const seen = walked([rule("tilde.md", condition("subject", "contains", false, "~"))])
    expect(seen.some((one) => !one.message.subject.includes("~"))).toBe(true)
    expect(seen.some((one) => one.message.subject.includes("~"))).toBe(true)
  })
})

describe("two values one message can hold at once", () => {
  test("are posed together, a subject being able to carry both", () => {
    const seen = walked([
      rule("shipped.md", condition("subject", "contains", false, "shipped")),
      rule("delivered.md", condition("subject", "contains", false, "delivered")),
    ])
    expect(
      seen.some(
        (one) =>
          one.message.subject.includes("shipped") && one.message.subject.includes("delivered")
      )
    ).toBe(true)
    expect(seen.some((one) => one.matched.length === 2)).toBe(true)
  })

  test("are not posed where no value can hold both, two equalities excluding each other", () => {
    const seen = walked([
      rule("one.md", condition("from", "is", false, "a@example.com")),
      rule("other.md", condition("from", "is", false, "b@example.com")),
    ])
    expect(seen.every((one) => one.matched.length <= 1)).toBe(true)
    expect(seen.filter((one) => one.matched.length === 1)).toHaveLength(2)
  })
})

describe("a negated condition", () => {
  test("holds where none of its values holds, and fails where any one of them does", () => {
    const residual = rule(
      "residual.md",
      condition("from", "is", true, "a@example.com", "b@example.com")
    )
    const seen = walked([residual])
    const claimed = seen
      .filter((one) => one.matched.length === 1)
      .map((one) => one.message.fromAddress)
    expect(claimed).not.toContain("a@example.com")
    expect(claimed).not.toContain("b@example.com")
    expect(claimed.length).toBeGreaterThan(0)
  })

  test("leaves the values it names to the rules that state them, so the three partition", () => {
    const seen = walked([
      rule("one.md", condition("from", "is", false, "a@example.com")),
      rule("other.md", condition("from", "is", false, "b@example.com")),
      rule("residual.md", condition("from", "is", true, "a@example.com", "b@example.com")),
    ])
    expect(seen.every((one) => one.matched.length === 1)).toBe(true)
  })
})

describe("conditions on two fields", () => {
  test("are conjoined, so a rule is posed the message that satisfies one and not the other", () => {
    const seen = walked([
      rule(
        "both.md",
        condition("from", "is", false, "a@example.com"),
        condition("subject", "contains", false, "receipt")
      ),
    ])
    expect(
      seen.some(
        (one) =>
          one.message.fromAddress === "a@example.com" &&
          !one.message.subject.includes("receipt") &&
          one.matched.length === 0
      )
    ).toBe(true)
    expect(seen.some((one) => one.matched.length === 1)).toBe(true)
  })
})

describe("a walk that would not fit under its ceiling", () => {
  test("says so rather than reporting what it reached", () => {
    const rules = Array.from({ length: 12 }, (_, at) =>
      rule(`${at}.md`, condition("subject", "contains", false, `word${at}`))
    )
    const reading = eachMessage(rules, () => {}, 8)
    expect(reading.restricted).toBe(true)
  })

  test("is not restricted where the whole space fits under it", () => {
    const reading = eachMessage(
      [rule("one.md", condition("from", "is", false, "a@b.com"))],
      () => {},
      8
    )
    expect(reading.restricted).toBe(false)
    expect(reading.messages).toBe(2)
  })
})

describe("what a refusal names", () => {
  test("is all four fields a condition can read", () => {
    const seen = walked([rule("one.md", condition("from", "is", false, "a@b.com"))])
    const named = describeMessage(seen[0]?.message as Message)
    for (const field of ["from", "to", "subject", "list"]) expect(named).toContain(`${field} \``)
  })
})
