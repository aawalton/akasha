import { describe, expect, test } from "bun:test"
import { ruleText } from "../lib/instructions-rule.ts"

const CTX = {
  command: "seat start",
  where: "tools/lib/spawn-guard.ts",
  call: "decideSpawnGuard",
}

describe("a decision that carries nothing to say", () => {
  test("every empty answer refuses rather than being filled in here", () => {
    for (const empty of [undefined, ""]) {
      expect(() => ruleText(empty, "reason", CTX)).toThrow("reason")
    }
  })

  test("the refusal names the rule and the call, so the reader reaches a file", () => {
    expect(() => ruleText(undefined, "reason", CTX)).toThrow("tools/lib/spawn-guard.ts")
    expect(() => ruleText(undefined, "reason", CTX)).toThrow("decideSpawnGuard")
  })

  test("any non-empty answer passes through unchanged", () => {
    for (const stated of ["a live agent already holds this name", "x"]) {
      expect(ruleText(stated, "reason", CTX)).toBe(stated)
    }
  })
})
