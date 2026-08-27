import "./test-eso-load-globals"

import { describe, expect, it } from "bun:test"
import { matchCategory } from "./browser-categories"
import type { BrowserRow } from "./browser-types"

function eso(name: string): number {
  const value = Reflect.get(globalThis, name)
  if (typeof value !== "number") throw new Error(`ESO global ${name} not defined`)
  return value
}

function makeRow(overrides: Partial<BrowserRow> = {}): BrowserRow {
  return {
    itemId: 1000,
    itemLink: "|H0:item:1000|h|h",
    itemName: "Test Item",
    quality: 3,
    icon: "/esoui/art/icons/test.dds",
    aggregatedQty: 10,
    worn: false,
    wornCompanion: false,
    stolen: false,
    setName: "",
    itemType: 0,
    specializedItemType: 0,
    weaponType: 0,
    armorType: 0,
    equipType: 0,
    furnitureCategoryId: 0,
    furnitureSubcategoryId: 0,
    isCompanionItem: false,
    isFurnishing: false,
    locations: [],
    ...overrides,
  }
}

describe("matchCategory — All / Stolen", () => {
  it("All matches every row regardless of type", () => {
    expect(matchCategory(makeRow(), "All", [])).toBe(true)
    expect(matchCategory(makeRow({ isCompanionItem: true, stolen: true }), "All", [])).toBe(true)
    expect(matchCategory(makeRow({ isFurnishing: true }), "All", [])).toBe(true)
  })

  it("Stolen matches only stolen rows", () => {
    expect(matchCategory(makeRow({ stolen: true }), "Stolen", [])).toBe(true)
    expect(matchCategory(makeRow({ stolen: false }), "Stolen", [])).toBe(false)
  })
})

describe("matchCategory — Weapons (empty subfilter → all weapon types)", () => {
  it("matches a non-companion weapon row", () => {
    const row = makeRow({ weaponType: eso("WEAPONTYPE_AXE"), isCompanionItem: false })
    expect(matchCategory(row, "Weapons", [])).toBe(true)
  })

  it("rejects a non-weapon row", () => {
    const row = makeRow({ weaponType: 0 })
    expect(matchCategory(row, "Weapons", [])).toBe(false)
  })

  it("rejects a companion weapon (companions excluded from every non-Companion group)", () => {
    const row = makeRow({ weaponType: eso("WEAPONTYPE_AXE"), isCompanionItem: true })
    expect(matchCategory(row, "Weapons", [])).toBe(false)
  })
})

describe("matchCategory — Weapons (populated subfilter → listed weaponType only)", () => {
  const BOW = 8
  const AXE = 1

  it("matches only a weaponType present in the subfilter list", () => {
    expect(matchCategory(makeRow({ weaponType: BOW }), "Weapons", [BOW])).toBe(true)
    expect(matchCategory(makeRow({ weaponType: AXE }), "Weapons", [BOW])).toBe(false)
  })

  it("still excludes a companion item even when its weaponType is listed", () => {
    const row = makeRow({ weaponType: BOW, isCompanionItem: true })
    expect(matchCategory(row, "Weapons", [BOW])).toBe(false)
  })
})

describe("matchCategory — Armor (dual filter [armorType, equipType])", () => {
  const LIGHT = 11
  const HEAVY = 13
  const CHEST = 2
  const FEET = 3

  it("matches when armorType === subfilter[0] and equipType is in the rest", () => {
    const row = makeRow({ armorType: LIGHT, equipType: CHEST, isCompanionItem: false })
    expect(matchCategory(row, "Armor", [LIGHT, CHEST])).toBe(true)
  })

  it("rejects a row whose armorType differs from subfilter[0]", () => {
    const row = makeRow({ armorType: HEAVY, equipType: CHEST })
    expect(matchCategory(row, "Armor", [LIGHT, CHEST])).toBe(false)
  })

  it("rejects a row whose equipType is not among the trailing subfilter entries", () => {
    const row = makeRow({ armorType: LIGHT, equipType: FEET })
    expect(matchCategory(row, "Armor", [LIGHT, CHEST])).toBe(false)
  })
})

describe("matchCategory — Companion group vs. companion exclusion", () => {
  it("Companion (empty subfilter) matches any companion item", () => {
    expect(matchCategory(makeRow({ isCompanionItem: true }), "Companion", [])).toBe(true)
  })

  it("Companion rejects a non-companion item", () => {
    expect(matchCategory(makeRow({ isCompanionItem: false }), "Companion", [])).toBe(false)
  })
})

describe("matchCategory — Junk (itemType === subfilter[0])", () => {
  it("matches only when itemType equals the first subfilter entry", () => {
    expect(matchCategory(makeRow({ itemType: 42 }), "Junk", [42])).toBe(true)
    expect(matchCategory(makeRow({ itemType: 7 }), "Junk", [42])).toBe(false)
  })
})
