import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { stackFullnessFilter } from "./stack-fullness-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const full: ItemFacts = { ...baseFacts, stackCount: 200, maxStackSize: 200 }
const partial: ItemFacts = { ...baseFacts, stackCount: 50, maxStackSize: 200 }
const unknown: ItemFacts = { ...baseFacts }

describe("stackFullnessFilter", () => {
  it("include matches a full stack and rejects a partial stack", () => {
    expect(stackFullnessFilter.matches(full, "include")).toBe(true)
    expect(stackFullnessFilter.matches(partial, "include")).toBe(false)
  })

  it("exclude matches a partial stack and rejects a full stack", () => {
    expect(stackFullnessFilter.matches(partial, "exclude")).toBe(true)
    expect(stackFullnessFilter.matches(full, "exclude")).toBe(false)
  })

  it("fails closed when the stack signals are undefined (neither pole matches)", () => {
    expect(stackFullnessFilter.matches(unknown, "include")).toBe(false)
    expect(stackFullnessFilter.matches(unknown, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(stackFullnessFilter.deserialize(stackFullnessFilter.serialize("include"))).toBe(
      "include"
    )
    expect(stackFullnessFilter.deserialize(stackFullnessFilter.serialize("exclude"))).toBe(
      "exclude"
    )
    expect(stackFullnessFilter.deserialize("nonsense")).toBeUndefined()
    expect(stackFullnessFilter.deserialize(42)).toBeUndefined()
  })
})
