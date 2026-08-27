import { describe, expect, test } from "bun:test"
import {
  buildRulePopulationNotification,
  type EmptyRuleLine,
  type RulePopulationSweepInput,
} from "../lib/rule-population-sweep/notification.ts"

const rule = (name: string, offered: number): EmptyRuleLine => ({
  rule: name,
  kind: "syntax-scanner",
  source: "infra/cluster-checks/src/lib/scanner-registry.ts",
  offered,
})

const input = (over: Partial<RulePopulationSweepInput> = {}): RulePopulationSweepInput => ({
  rulesRead: 25,
  empty: [],
  filesExamined: 14024,
  filesDeclared: 14024,
  blindSpots: ["ast-grep rules — enforced by their own gate"],
  ...over,
})

describe("buildRulePopulationNotification", () => {
  test("refuses to compose anything from a sweep that read no rules", () => {
    expect(() => buildRulePopulationNotification(input({ rulesRead: 0 }))).toThrow(/0 rules/)
  })

  test("a sweep that read rules and found none empty still files a body", () => {
    const built = buildRulePopulationNotification(input())
    expect(built.emptyCount).toBe(0)
    expect(built.text).toContain("every rule weighed a population")
  })

  test("both paths carry the rule count and the file coverage", () => {
    const clean = buildRulePopulationNotification(input())
    const found = buildRulePopulationNotification(input({ empty: [rule("blind", 900)] }))
    for (const built of [clean, found]) {
      expect(built.text).toContain("25 rule(s)")
      expect(built.text).toContain("14,024 of 14,024 TS file(s)")
    }
  })

  test("every empty rule is named, never summarized to a count", () => {
    const empty = Array.from({ length: 12 }, (_, i) => rule(`scanner-${i}`, 100 + i))
    const built = buildRulePopulationNotification(input({ empty }))
    expect(built.emptyCount).toBe(12)
    for (const r of empty) expect(built.text).toContain(r.rule)
  })

  test("the body says an empty population is grounds for a reading, not for removal", () => {
    const built = buildRulePopulationNotification(input({ empty: [rule("blind", 4321)] }))
    expect(built.text).toContain("certifies nothing")
    expect(built.text).toContain("removed")
    expect(built.text).toContain("repaired")
  })

  test("the blind spots ride every body, found or clean", () => {
    const clean = buildRulePopulationNotification(input())
    const found = buildRulePopulationNotification(input({ empty: [rule("blind", 1)] }))
    for (const built of [clean, found]) {
      expect(built.text).toContain("NOT READ BY THIS SWEEP:")
      expect(built.text).toContain("ast-grep rules — enforced by their own gate")
    }
  })
})
