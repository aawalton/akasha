import { describe, expect, test } from "bun:test"
import { formatBagSlots } from "./session-tracking"

describe("formatBagSlots", () => {
  test("formats used/total backpack slots", () => {
    expect(formatBagSlots(87, 120)).toBe("87/120")
  })

  test("handles an empty backpack", () => {
    expect(formatBagSlots(0, 110)).toBe("0/110")
  })

  test("handles a full backpack", () => {
    expect(formatBagSlots(200, 200)).toBe("200/200")
  })
})
