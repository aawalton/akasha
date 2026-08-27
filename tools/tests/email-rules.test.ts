
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { decide, matches, rulesOf } from "../lib/email-rules.ts"
import type { Message } from "../lib/gmail.ts"
import { fixture, type Fixture } from "./fixture.ts"
import { emailRuleStore } from "./rules-fixture.ts"

let at: Fixture

beforeEach(() => {
  at = fixture()
  emailRuleStore(at)
})
afterEach(() => at.dispose())

function mail(fields: Partial<Message> = {}): Message {
  return {
    id: "m1",
    threadId: "t1",
    from: "Amazon <order-update@amazon.com>",
    fromAddress: "order-update@amazon.com",
    to: "aawalton@gmail.com",
    subject: "Your order has shipped",
    listId: "",
    labelIds: ["INBOX"],
    arrivedAt: new Date("2026-08-12T12:00:00Z"),
    unsubscribe: "",
    oneClickUnsubscribe: false,
    ...fields,
  }
}

const condition = (field: string, test: string, ...values: readonly string[]): string =>
  `- **${field}** ${test}\n${values.map((one) => `  - \`${one}\`\n`).join("")}`

function rule(slug: string, match: string, frontmatter = "actions:\n  - archive", kind = "code"): void {
  at.put(`pages/email-rule-${kind}/alan/${slug}.md`, `---\n${frontmatter}\n---\n\n# Match\n\n${match}`)
}

describe("the conditions of one match", () => {
  test("all have to hold, a second condition narrowing the first", () => {
    const both = [
      { field: "from" as const, test: "contains" as const, negated: false, values: ["amazon.com"] },
      { field: "subject" as const, test: "contains" as const, negated: false, values: ["delivered"] },
    ]
    expect(matches(both, mail())).toBe(false)
    expect(matches(both, mail({ subject: "Your order was delivered" }))).toBe(true)
  })

  test("hold when any one value of a condition does", () => {
    const one = [{ field: "from" as const, test: "contains" as const, negated: false, values: ["ebay.com", "amazon.com"] }]
    expect(matches(one, mail())).toBe(true)
  })

  test("are compared without regard to case, on the value and on the mail alike", () => {
    const shouted = [{ field: "subject" as const, test: "contains" as const, negated: false, values: ["SHIPPED"] }]
    expect(matches(shouted, mail({ subject: "Your Order Has Shipped" }))).toBe(true)
  })

  test("match everything when there are none, which is how the terminal rule is spelled", () => {
    expect(matches([], mail())).toBe(true)
  })
})

describe("a `from` condition", () => {
  test("reads the address and not the display name a sender chose", () => {
    const bank = [{ field: "from" as const, test: "contains" as const, negated: false, values: ["uccu.com"] }]
    const forged = mail({ from: '"support@uccu.com" <mail@attacker.example>', fromAddress: "mail@attacker.example" })
    expect(matches(bank, forged)).toBe(false)
  })
})

describe("a negated condition", () => {
  test("holds where NONE of its values holds, rather than where any one of them fails", () => {
    const neither = [
      { field: "from" as const, test: "ends with" as const, negated: true, values: ["google.com", "amazon.com"] },
    ]
    expect(matches(neither, mail())).toBe(false)
    expect(matches(neither, mail({ fromAddress: "hey@lob.com" }))).toBe(true)
  })

  test("carves a sender out of a wider condition standing beside it", () => {
    const wardNotices = [
      { field: "from" as const, test: "ends with" as const, negated: false, values: ["google.com"] },
      { field: "from" as const, test: "is" as const, negated: true, values: ["noreply-dmarc-support@google.com"] },
    ]
    expect(matches(wardNotices, mail({ fromAddress: "payments-noreply@google.com" }))).toBe(true)
    expect(matches(wardNotices, mail({ fromAddress: "noreply-dmarc-support@google.com" }))).toBe(false)
  })
})

describe("which rules are read", () => {
  test("every document in both kind folders, with nothing listing them", () => {
    rule("amazon", condition("from", "contains", "amazon.com"))
    rule("elsewhere", condition("from", "contains", "ebay.com"), undefined, "agent")
    expect(rulesOf("alan", at.root).map((one) => one.slug).sort()).toEqual(["amazon", "elsewhere"])
  })

  test("the one rule that matches, the rule set being a partition", () => {
    rule("amazon", condition("from", "contains", "amazon.com"))
    rule("elsewhere", condition("from", "contains", "ebay.com"))
    expect(decide(rulesOf("alan", at.root), mail())?.slug).toBe("amazon")
  })
})

describe("what a rule carries into the decision", () => {
  test("a delay in minutes and in hours, and none where the rule states none", () => {
    rule("quick", condition("from", "contains", "amazon.com"), "actions:\n  - archive\ndelay: 15m")
    rule("slow", condition("from", "contains", "ebay.com"), "actions:\n  - archive\ndelay: 2h")
    rule("now", condition("from", "contains", "apple.com"))
    const read = rulesOf("alan", at.root)
    expect(read.map((one) => [one.slug, one.delayMinutes])).toEqual([
      ["now", 0],
      ["quick", 15],
      ["slow", 120],
    ])
  })

  test("an agent rule's own judgment, which is what the agent applies", () => {
    at.put(
      "pages/email-rule-agent/alan/ki-invitations.email-rule-agent.md",
      "---\n---\n\n# Match\n\n" +
        condition("from", "is", "rkigoff@gmail.com") +
        "\n# Rule\n\n**Accept every invitation Ki sends Alan, then archive it.**\n\nAccepting is reversible.\n"
    )
    const read = rulesOf("alan", at.root)
    expect(read[0].kind).toBe("agent")
    expect(read[0].judgment).toContain("Accept every invitation")
  })
})
