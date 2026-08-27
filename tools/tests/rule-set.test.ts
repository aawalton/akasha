
import { describe, expect, test } from "bun:test"
import { readdirSync, readFileSync } from "node:fs"
import { emailRuleSet } from "../lib/email-rule-set.ts"
import { comparisonsOf } from "../lib/rules-engine.ts"

const ROOT = `${import.meta.dir}/../..`
const FOLDERS = ["pages/email-rule-code/alan", "pages/email-rule-agent/alan"] as const

const FIELDS_BY_HAND = ["from", "to", "subject", "list"] as const

const TESTS_BY_HAND = [
  "is",
  "is not",
  "starts with",
  "does not start with",
  "ends with",
  "does not end with",
  "contains",
  "does not contain",
] as const

function conditions(): readonly { readonly field: string; readonly test: string }[] {
  const found: { field: string; test: string }[] = []
  for (const folder of FOLDERS) {
    for (const name of readdirSync(`${ROOT}/${folder}`)) {
      if (!name.endsWith(".md")) continue
      for (const line of readFileSync(`${ROOT}/${folder}/${name}`, "utf8").split("\n")) {
        const written = /^- \*\*([a-z-]+)\*\* ([a-z ]+?)\s*$/.exec(line)
        if (written !== null) found.push({ field: written[1] as string, test: written[2] as string })
      }
    }
  }
  return found
}

describe("the mail ruleSet, as it declares itself", () => {
  const ruleSet = emailRuleSet

  test("it declares the four fields the hand-written schema admitted, and no others", () => {
    expect([...ruleSet.fields.map((one) => one.name)].sort()).toEqual([...FIELDS_BY_HAND].sort())
  })

  test("four text fields derive the eight comparisons somebody wrote by hand, in that order", () => {
    expect(comparisonsOf(ruleSet)).toEqual([...TESTS_BY_HAND])
  })

  test("no field declares enum values, this ruleSet holding no enum", () => {
    for (const field of ruleSet.fields) {
      expect(field.type).toBe("text")
      expect(field.values).toEqual([])
    }
  })

  test("it says where both kinds of its rules stand", () => {
    expect(ruleSet.kinds.code?.glob).toBe("pages/email-rule-code/**/*.email-rule-code.md")
    expect(ruleSet.kinds.agent?.glob).toBe("pages/email-rule-agent/**/*.email-rule-agent.md")
  })

  test("no rule standing today names a field the declaration omits", () => {
    const names = ruleSet.fields.map((one) => one.name)
    const used = conditions()
    expect(used.length).toBeGreaterThan(0)
    for (const one of used) expect(names).toContain(one.field)
  })

  test("no rule standing today asks a comparison the declaration does not derive", () => {
    const derived = comparisonsOf(ruleSet)
    for (const one of conditions()) expect(derived).toContain(one.test)
  })
})
