import { describe, expect, it } from "bun:test"
import { itemPassesConditions } from "./generated/inventory-rule-conditions.generated"
import { makeItem } from "./inventory-rule-test-utils"

describe("itemPassesConditions — setSourceTypes", () => {
  it("passes when setId resolves to an allowed category", () => {
    const item = makeItem({ setId: 80 })
    expect(itemPassesConditions(item, { setSourceTypes: ["crafted"] })).toBe(true)
  })

  it("rejects when setId resolves to a disallowed category", () => {
    const item = makeItem({ setId: 80 })
    expect(itemPassesConditions(item, { setSourceTypes: ["overland"] })).toBe(false)
  })

  it("passes when setId is in any of multiple allowed categories", () => {
    const item = makeItem({ setId: 292 })
    expect(itemPassesConditions(item, { setSourceTypes: ["overland", "crafted"] })).toBe(true)
  })

  it("rejects unknown setId (falls into 'no-type') when no-type is not allowed", () => {
    const item = makeItem({ setId: 999999 })
    expect(itemPassesConditions(item, { setSourceTypes: ["crafted"] })).toBe(false)
  })

  it("passes unknown setId when 'no-type' is allowed", () => {
    const item = makeItem({ setId: 999999 })
    expect(itemPassesConditions(item, { setSourceTypes: ["no-type"] })).toBe(true)
  })

  it("passes through when setId is undefined (no set, or pre-existing data)", () => {
    const item = makeItem({})
    expect(itemPassesConditions(item, { setSourceTypes: ["crafted"] })).toBe(true)
  })

  it("passes through with empty setSourceTypes array", () => {
    const item = makeItem({ setId: 80 })
    expect(itemPassesConditions(item, { setSourceTypes: [] })).toBe(true)
  })

  it("matches monster set against 'monster' category", () => {
    const item = makeItem({ setId: 170 })
    expect(itemPassesConditions(item, { setSourceTypes: ["monster"] })).toBe(true)
    expect(itemPassesConditions(item, { setSourceTypes: ["dungeon"] })).toBe(false)
  })
})
