import "./test-eso-load-globals"

import { describe, expect, it } from "bun:test"
import { ESO_BAG_BACKPACK } from "@temper/game-items-core/eso-bag-constants"
import type { ItemLocationEntry } from "@temper/game-items-core/item-centric-inventory"
import { filterRows, matchQuality, matchSearch, sortRows } from "./browser-filter"
import type { BrowserFilterState, BrowserRow, LocationViewOption } from "./browser-types"
import { BROWSER_QUALITY_ANY } from "./browser-types"

const CURRENT_CHAR = "char-1"

const ALL_LOCATIONS: LocationViewOption = { label: "all", kind: "fixed", fixedId: "all" }

function makeLocationEntry(overrides: Partial<ItemLocationEntry> = {}): ItemLocationEntry {
  return {
    locationKey: CURRENT_CHAR,
    locationType: "character",
    displayName: "Char One",
    bagId: ESO_BAG_BACKPACK,
    slotIndex: 0,
    stackCount: 1,
    lastScanned: 1000,
    ...overrides,
  }
}

function makeRow(overrides: Partial<BrowserRow> = {}): BrowserRow {
  return {
    itemId: 1000,
    itemLink: "|H0:item:1000|h|h",
    itemName: "Ebony Axe",
    quality: 3,
    icon: "/esoui/art/icons/test.dds",
    aggregatedQty: 5,
    worn: false,
    wornCompanion: false,
    stolen: false,
    setName: "Julianos",
    itemType: 0,
    specializedItemType: 0,
    weaponType: 0,
    armorType: 0,
    equipType: 0,
    furnitureCategoryId: 0,
    furnitureSubcategoryId: 0,
    isCompanionItem: false,
    isFurnishing: false,
    locations: [makeLocationEntry()],
    ...overrides,
  }
}

function makeState(overrides: Partial<BrowserFilterState> = {}): BrowserFilterState {
  return {
    category: "All",
    subfilterTypes: [],
    quality: BROWSER_QUALITY_ANY,
    locationOption: ALL_LOCATIONS,
    searchText: "",
    searchMode: "both",
    sortKey: "name",
    sortAscending: true,
    ...overrides,
  }
}

describe("matchQuality", () => {
  it("matches any row when quality is the ANY sentinel", () => {
    expect(matchQuality(makeRow({ quality: 3 }), BROWSER_QUALITY_ANY)).toBe(true)
    expect(matchQuality(makeRow({ quality: 0 }), BROWSER_QUALITY_ANY)).toBe(true)
  })

  it("matches only the exact quality otherwise", () => {
    expect(matchQuality(makeRow({ quality: 3 }), 3)).toBe(true)
    expect(matchQuality(makeRow({ quality: 3 }), 4)).toBe(false)
  })
})

describe("matchSearch", () => {
  const row = makeRow({ itemName: "Ebony Axe", setName: "Julianos" })

  it("empty search matches in every mode", () => {
    expect(matchSearch(row, "", "name")).toBe(true)
    expect(matchSearch(row, "", "set")).toBe(true)
    expect(matchSearch(row, "", "both")).toBe(true)
  })

  it("name mode matches the (case-insensitive) item name only", () => {
    expect(matchSearch(row, "axe", "name")).toBe(true)
    expect(matchSearch(row, "ebon", "name")).toBe(true)
    expect(matchSearch(row, "julian", "name")).toBe(false)
  })

  it("name mode lowercases the row's item name before comparing", () => {
    expect(matchSearch(makeRow({ itemName: "EBONY AXE" }), "axe", "name")).toBe(true)
  })

  it("set mode matches the set name only", () => {
    expect(matchSearch(row, "julian", "set")).toBe(true)
    expect(matchSearch(row, "axe", "set")).toBe(false)
  })

  it("both mode matches either name or set", () => {
    expect(matchSearch(row, "axe", "both")).toBe(true)
    expect(matchSearch(row, "julian", "both")).toBe(true)
    expect(matchSearch(row, "zzz", "both")).toBe(false)
  })
})

describe("filterRows", () => {
  it("keeps a row that passes every predicate", () => {
    const rows = [makeRow()]
    expect(filterRows(rows, makeState(), CURRENT_CHAR)).toHaveLength(1)
  })

  it("excludes a row with zero aggregated quantity", () => {
    const rows = [makeRow({ aggregatedQty: 0 })]
    expect(filterRows(rows, makeState(), CURRENT_CHAR)).toHaveLength(0)
  })

  it("excludes a row that fails the location view", () => {
    const craftBag: LocationViewOption = { label: "craftBag", kind: "fixed", fixedId: "craftBag" }
    const rows = [makeRow()]
    expect(filterRows(rows, makeState({ locationOption: craftBag }), CURRENT_CHAR)).toHaveLength(0)
  })

  it("excludes a row that fails the category", () => {
    const rows = [makeRow({ stolen: false })]
    expect(filterRows(rows, makeState({ category: "Stolen" }), CURRENT_CHAR)).toHaveLength(0)
  })

  it("excludes a row that fails the quality filter", () => {
    const rows = [makeRow({ quality: 3 })]
    expect(filterRows(rows, makeState({ quality: 5 }), CURRENT_CHAR)).toHaveLength(0)
  })

  it("excludes a row that fails the search", () => {
    const rows = [makeRow({ itemName: "Ebony Axe", setName: "Julianos" })]
    const state = makeState({ searchText: "notpresent", searchMode: "name" })
    expect(filterRows(rows, state, CURRENT_CHAR)).toHaveLength(0)
  })

  it("keeps a row whose name matches the active search", () => {
    const rows = [makeRow({ itemName: "Ebony Axe" })]
    const state = makeState({ searchText: "axe", searchMode: "name" })
    expect(filterRows(rows, state, CURRENT_CHAR)).toHaveLength(1)
  })

  it("keeps only the rows that survive every predicate together", () => {
    const keep = makeRow({ itemId: 1, itemName: "Ebony Axe", quality: 3, aggregatedQty: 4 })
    const dropQty = makeRow({ itemId: 2, itemName: "Ebony Sword", quality: 3, aggregatedQty: 0 })
    const dropSearch = makeRow({ itemId: 3, itemName: "Ancient Bow", quality: 3, aggregatedQty: 9 })
    const state = makeState({ searchText: "ebony", searchMode: "name" })
    const result = filterRows([keep, dropQty, dropSearch], state, CURRENT_CHAR)
    expect(result.map((r) => r.itemId)).toEqual([1])
  })
})

describe("sortRows", () => {
  function fixture(): BrowserRow[] {
    return [
      makeRow({ itemId: 1, itemName: "Cherry", quality: 2 }),
      makeRow({ itemId: 2, itemName: "Apple", quality: 5 }),
      makeRow({ itemId: 3, itemName: "Banana", quality: 1 }),
    ]
  }

  it("returns a new array without mutating the input", () => {
    const input = fixture()
    const result = sortRows(input, "name", true)
    expect(result).not.toBe(input)
    expect(input.map((r) => r.itemId)).toEqual([1, 2, 3])
  })

  it("sorts by name ascending", () => {
    expect(sortRows(fixture(), "name", true).map((r) => r.itemName)).toEqual([
      "Apple",
      "Banana",
      "Cherry",
    ])
  })

  it("sorts by name descending (reverse of ascending)", () => {
    expect(sortRows(fixture(), "name", false).map((r) => r.itemName)).toEqual([
      "Cherry",
      "Banana",
      "Apple",
    ])
  })

  it("sorts by quality ascending", () => {
    expect(sortRows(fixture(), "quality", true).map((r) => r.quality)).toEqual([1, 2, 5])
  })

  it("sorts by quality descending", () => {
    expect(sortRows(fixture(), "quality", false).map((r) => r.quality)).toEqual([5, 2, 1])
  })
})
