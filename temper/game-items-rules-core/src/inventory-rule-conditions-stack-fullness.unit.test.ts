import { describe, expect, it } from "bun:test"
import { itemPassesConditions } from "./generated/inventory-rule-conditions.generated"
import { makeItem } from "./inventory-rule-test-utils"

describe("itemPassesConditions — stack-fullness (fail-closed: missing signal → false)", () => {
  it("passes full when stack is at max", () => {
    expect(
      itemPassesConditions(makeItem({ stackCount: 200, maxStackSize: 200 }), {
        stackFullness: "full",
      })
    ).toBe(true)
  })

  it("rejects full when stack is below max", () => {
    expect(
      itemPassesConditions(makeItem({ stackCount: 137, maxStackSize: 200 }), {
        stackFullness: "full",
      })
    ).toBe(false)
  })

  it("passes partial when stack is below max", () => {
    expect(
      itemPassesConditions(makeItem({ stackCount: 137, maxStackSize: 200 }), {
        stackFullness: "partial",
      })
    ).toBe(true)
  })

  it("rejects partial when stack is at max", () => {
    expect(
      itemPassesConditions(makeItem({ stackCount: 200, maxStackSize: 200 }), {
        stackFullness: "partial",
      })
    ).toBe(false)
  })

  it("rejects full when maxStackSize is undefined", () => {
    expect(itemPassesConditions(makeItem({ stackCount: 200 }), { stackFullness: "full" })).toBe(
      false
    )
  })

  it("treats a non-stackable 1/1 item as full", () => {
    expect(
      itemPassesConditions(makeItem({ stackCount: 1, maxStackSize: 1 }), {
        stackFullness: "full",
      })
    ).toBe(true)
  })
})
