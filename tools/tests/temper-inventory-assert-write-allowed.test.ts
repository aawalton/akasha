import { describe, expect, it } from "bun:test"
import { assertWriteAllowed } from "../lib/temper-inventory.ts"

describe("assertWriteAllowed", () => {
  it("does not throw when locked is false and force is false", () => {
    expect(() => assertWriteAllowed({ id: "rule-a", locked: false }, false)).not.toThrow()
  })

  it("throws when locked is true and force is false, naming the rule id and --force", () => {
    let err: unknown
    try {
      assertWriteAllowed({ id: "rule-locked", locked: true }, false)
    } catch (e) {
      err = e
    }
    expect(err).toBeDefined()
    const msg = err instanceof Error ? err.message : String(err)
    expect(msg).toContain("rule-locked")
    expect(msg).toContain("--force")
  })

  it("does not throw when locked is true and force is true", () => {
    expect(() => assertWriteAllowed({ id: "rule-locked-2", locked: true }, true)).not.toThrow()
  })

  it("does not throw when locked is undefined (treated as false)", () => {
    expect(() => assertWriteAllowed({ id: "rule-c" }, false)).not.toThrow()
  })
})
