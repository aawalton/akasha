
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { VECTORS } from "./supervisor-child-exit-rule-vectors.ts"

describe("the ported child-exit facade answers what the code repository's suite asserted", () => {
  for (const vector of VECTORS) {
    it(vector.name, async () => {
      const answered = await vector.ported()
      const verdict = hold(vector.name, vector.standing, answered)
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
    })
  }
})
