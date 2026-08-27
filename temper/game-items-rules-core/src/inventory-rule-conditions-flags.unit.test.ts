import { describe, expect, it } from "bun:test"
import { itemPassesConditions } from "./generated/inventory-rule-conditions.generated"
import { makeItem } from "./inventory-rule-test-utils"

describe("itemPassesConditions — stolen (fail-closed: undefined → false)", () => {
  it("rejects stolen='stolen' when item.stolen is undefined", () => {
    expect(itemPassesConditions(makeItem(), { stolen: "stolen" })).toBe(false)
  })

  it("passes stolen='stolen' when item.stolen is true", () => {
    expect(itemPassesConditions(makeItem({ stolen: true }), { stolen: "stolen" })).toBe(true)
  })

  it("rejects stolen='stolen' when item.stolen is false", () => {
    expect(itemPassesConditions(makeItem({ stolen: false }), { stolen: "stolen" })).toBe(false)
  })

  it("rejects stolen='not-stolen' when item.stolen is undefined", () => {
    expect(itemPassesConditions(makeItem(), { stolen: "not-stolen" })).toBe(false)
  })

  it("rejects stolen='not-stolen' when item.stolen is true", () => {
    expect(itemPassesConditions(makeItem({ stolen: true }), { stolen: "not-stolen" })).toBe(false)
  })

  it("passes stolen='not-stolen' when item.stolen is false", () => {
    expect(itemPassesConditions(makeItem({ stolen: false }), { stolen: "not-stolen" })).toBe(true)
  })
})

describe("itemPassesConditions — bound (fail-closed: undefined → false)", () => {
  it("rejects bound='bound' when item.bound is undefined", () => {
    expect(itemPassesConditions(makeItem(), { bound: "bound" })).toBe(false)
  })

  it("passes bound='bound' when item.bound is true", () => {
    expect(itemPassesConditions(makeItem({ bound: true }), { bound: "bound" })).toBe(true)
  })

  it("rejects bound='bound' when item.bound is false", () => {
    expect(itemPassesConditions(makeItem({ bound: false }), { bound: "bound" })).toBe(false)
  })

  it("rejects bound='not-bound' when item.bound is undefined", () => {
    expect(itemPassesConditions(makeItem(), { bound: "not-bound" })).toBe(false)
  })

  it("rejects bound='not-bound' when item.bound is true", () => {
    expect(itemPassesConditions(makeItem({ bound: true }), { bound: "not-bound" })).toBe(false)
  })

  it("passes bound='not-bound' when item.bound is false", () => {
    expect(itemPassesConditions(makeItem({ bound: false }), { bound: "not-bound" })).toBe(true)
  })
})

describe("itemPassesConditions — locked (absent = false)", () => {
  it("rejects locked='locked' when item.locked is undefined", () => {
    expect(itemPassesConditions(makeItem(), { locked: "locked" })).toBe(false)
  })

  it("passes locked='locked' when item.locked is true", () => {
    expect(itemPassesConditions(makeItem({ locked: true }), { locked: "locked" })).toBe(true)
  })

  it("rejects locked='locked' when item.locked is false", () => {
    expect(itemPassesConditions(makeItem({ locked: false }), { locked: "locked" })).toBe(false)
  })

  it("passes locked='not-locked' when item.locked is undefined (absent treated as false)", () => {
    expect(itemPassesConditions(makeItem(), { locked: "not-locked" })).toBe(true)
  })

  it("rejects locked='not-locked' when item.locked is true", () => {
    expect(itemPassesConditions(makeItem({ locked: true }), { locked: "not-locked" })).toBe(false)
  })

  it("passes locked='not-locked' when item.locked is false", () => {
    expect(itemPassesConditions(makeItem({ locked: false }), { locked: "not-locked" })).toBe(true)
  })
})

describe("itemPassesConditions — reconstructed (absent = false)", () => {
  it("rejects reconstructed='reconstructed' when item.reconstructed is undefined", () => {
    expect(itemPassesConditions(makeItem(), { reconstructed: "reconstructed" })).toBe(false)
  })

  it("passes reconstructed='reconstructed' when item.reconstructed is true", () => {
    expect(
      itemPassesConditions(makeItem({ reconstructed: true }), { reconstructed: "reconstructed" })
    ).toBe(true)
  })

  it("rejects reconstructed='reconstructed' when item.reconstructed is false", () => {
    expect(
      itemPassesConditions(makeItem({ reconstructed: false }), { reconstructed: "reconstructed" })
    ).toBe(false)
  })

  it("passes reconstructed='not-reconstructed' when item.reconstructed is undefined (absent treated as false)", () => {
    expect(itemPassesConditions(makeItem(), { reconstructed: "not-reconstructed" })).toBe(true)
  })

  it("rejects reconstructed='not-reconstructed' when item.reconstructed is true", () => {
    expect(
      itemPassesConditions(makeItem({ reconstructed: true }), {
        reconstructed: "not-reconstructed",
      })
    ).toBe(false)
  })

  it("passes reconstructed='not-reconstructed' when item.reconstructed is false", () => {
    expect(
      itemPassesConditions(makeItem({ reconstructed: false }), {
        reconstructed: "not-reconstructed",
      })
    ).toBe(true)
  })
})

describe("itemPassesConditions — transmuted (absent = false)", () => {
  it("rejects transmuted='transmuted' when item.transmuted is undefined", () => {
    expect(itemPassesConditions(makeItem(), { transmuted: "transmuted" })).toBe(false)
  })

  it("passes transmuted='transmuted' when item.transmuted is true", () => {
    expect(itemPassesConditions(makeItem({ transmuted: true }), { transmuted: "transmuted" })).toBe(
      true
    )
  })

  it("rejects transmuted='transmuted' when item.transmuted is false", () => {
    expect(
      itemPassesConditions(makeItem({ transmuted: false }), { transmuted: "transmuted" })
    ).toBe(false)
  })

  it("passes transmuted='not-transmuted' when item.transmuted is undefined (absent treated as false)", () => {
    expect(itemPassesConditions(makeItem(), { transmuted: "not-transmuted" })).toBe(true)
  })

  it("rejects transmuted='not-transmuted' when item.transmuted is true", () => {
    expect(
      itemPassesConditions(makeItem({ transmuted: true }), { transmuted: "not-transmuted" })
    ).toBe(false)
  })

  it("passes transmuted='not-transmuted' when item.transmuted is false", () => {
    expect(
      itemPassesConditions(makeItem({ transmuted: false }), { transmuted: "not-transmuted" })
    ).toBe(true)
  })
})

describe("itemPassesConditions — crafted (absent = false)", () => {
  it("rejects crafted='crafted' when item.crafted is undefined", () => {
    expect(itemPassesConditions(makeItem(), { crafted: "crafted" })).toBe(false)
  })

  it("passes crafted='crafted' when item.crafted is true", () => {
    expect(itemPassesConditions(makeItem({ crafted: true }), { crafted: "crafted" })).toBe(true)
  })

  it("rejects crafted='crafted' when item.crafted is false", () => {
    expect(itemPassesConditions(makeItem({ crafted: false }), { crafted: "crafted" })).toBe(false)
  })

  it("passes crafted='not-crafted' when item.crafted is undefined (absent treated as false)", () => {
    expect(itemPassesConditions(makeItem(), { crafted: "not-crafted" })).toBe(true)
  })

  it("rejects crafted='not-crafted' when item.crafted is true", () => {
    expect(itemPassesConditions(makeItem({ crafted: true }), { crafted: "not-crafted" })).toBe(
      false
    )
  })

  it("passes crafted='not-crafted' when item.crafted is false", () => {
    expect(itemPassesConditions(makeItem({ crafted: false }), { crafted: "not-crafted" })).toBe(
      true
    )
  })
})
