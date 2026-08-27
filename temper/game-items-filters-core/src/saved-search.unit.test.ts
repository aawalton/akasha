import { describe, expect, it } from "bun:test"
import { buildFilterIndex } from "./filter-registry"
import type { ActiveFilterValues } from "./filter-set"
import type { AnyTemperFilter, FilterId, FilterValue } from "./filter-types"
import type { SavedSearch } from "./saved-search"
import { deserializeSavedSearch, serializeSavedSearch } from "./saved-search"

const INDEX = buildFilterIndex()

function active(entries: readonly (readonly [string, FilterValue])[]): ActiveFilterValues {
  return new Map(entries)
}

describe("serializeSavedSearch / deserializeSavedSearch round-trip", () => {
  it("round-trips a representative spread (multiselect, range, toggle, text)", () => {
    const a = active([
      ["quality", ["5", "4"]],
      ["level", { value: 50, op: ">=" }],
      ["stolen", "exclude"],
      ["item-name", "Spider Silk"],
    ])
    const saved = serializeSavedSearch("My Search", a, INDEX)
    const restored = deserializeSavedSearch(saved, INDEX)

    expect(restored.get("quality")).toEqual(["5", "4"])
    expect(restored.get("level")).toEqual({ value: 50, op: ">=" })
    expect(restored.get("stolen")).toBe("exclude")
    expect(restored.get("item-name")).toBe("Spider Silk")
    expect(restored.size).toBe(4)
  })

  it("reproduces the active map for every currently-registered filter", () => {
    const entries: Array<[FilterId, FilterValue]> = []
    for (const filter of INDEX.values()) {
      entries.push([filter.id, sampleFor(filter)])
    }
    const a = active(entries)
    const restored = deserializeSavedSearch(serializeSavedSearch("All", a, INDEX), INDEX)
    expect(restored).toEqual(a)
  })
})

describe("serializeSavedSearch", () => {
  it("builds the SavedSearch envelope with version, name, and filters", () => {
    const saved = serializeSavedSearch("Legendary", active([["quality", ["5"]]]), INDEX)
    expect(saved.version).toBe(1)
    expect(saved.name).toBe("Legendary")
    expect(saved.filters).toEqual({ quality: ["5"] })
    expect(saved.sort).toBeUndefined()
    expect(saved.guildScope).toBeUndefined()
  })

  it("carries optional sort and guildScope through", () => {
    const saved = serializeSavedSearch("Cheap", active([["quality", ["1"]]]), INDEX, {
      sort: { field: "price", order: "asc" },
      guildScope: "all",
    })
    expect(saved.sort).toEqual({ field: "price", order: "asc" })
    expect(saved.guildScope).toBe("all")
  })

  it("skips active ids not present in the index", () => {
    const a = active([
      ["quality", ["5"]],
      ["no-such-filter", "include"],
    ])
    const saved = serializeSavedSearch("Partial", a, INDEX)
    expect(saved.filters).toEqual({ quality: ["5"] })
    expect(Object.keys(saved.filters)).not.toContain("no-such-filter")
  })

  it("produces an empty filters object for an empty active set", () => {
    const saved = serializeSavedSearch("Empty", new Map(), INDEX)
    expect(saved.filters).toEqual({})
    expect(Object.keys(saved.filters)).toHaveLength(0)
  })

  it("orders filter keys by index iteration order, not active insertion order", () => {
    const indexOrder = [...INDEX.keys()]
    const reversed = active(
      [...INDEX.values()].reverse().map((filter) => [filter.id, sampleFor(filter)])
    )
    const saved = serializeSavedSearch("Ordered", reversed, INDEX)
    expect(Object.keys(saved.filters)).toEqual(indexOrder)
  })

  it("serializes two equal active sets identically regardless of insertion order", () => {
    const forward = active([...INDEX.values()].map((filter) => [filter.id, sampleFor(filter)]))
    const backward = active(
      [...INDEX.values()].reverse().map((filter) => [filter.id, sampleFor(filter)])
    )
    const a = serializeSavedSearch("X", forward, INDEX)
    const b = serializeSavedSearch("X", backward, INDEX)
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })
})

describe("deserializeSavedSearch resilience", () => {
  it("drops an unknown FilterId in the saved record without throwing", () => {
    const saved: SavedSearch = {
      version: 1,
      name: "Stale",
      filters: { quality: ["5"], "ghost-filter": "include" },
    }
    const restored = deserializeSavedSearch(saved, INDEX)
    expect(restored.get("quality")).toEqual(["5"])
    expect(restored.has("ghost-filter")).toBe(false)
    expect(restored.size).toBe(1)
  })

  it("drops a filter whose deserialize returns undefined (malformed) but keeps the rest", () => {
    const saved: SavedSearch = {
      version: 1,
      name: "Malformed",
      filters: {
        quality: ["5"],
        level: "not-a-range",
        stolen: "exclude",
      },
    }
    const restored = deserializeSavedSearch(saved, INDEX)
    expect(restored.get("quality")).toEqual(["5"])
    expect(restored.get("stolen")).toBe("exclude")
    expect(restored.has("level")).toBe(false)
    expect(restored.size).toBe(2)
  })

  it("never throws and returns an empty map when every entry is unknown or malformed", () => {
    const saved: SavedSearch = {
      version: 1,
      name: "AllBad",
      filters: { "ghost-a": 1, "ghost-b": "x" },
    }
    let restored: ActiveFilterValues | undefined
    expect(() => {
      restored = deserializeSavedSearch(saved, INDEX)
    }).not.toThrow()
    expect(restored?.size).toBe(0)
  })

  it("yields an empty active map for an empty saved filters object", () => {
    const saved = { version: 1 as const, name: "Empty", filters: {} }
    expect(deserializeSavedSearch(saved, INDEX).size).toBe(0)
  })
})

function sampleFor(filter: AnyTemperFilter): FilterValue {
  switch (filter.editor.kind) {
    case "multiselect":
      return ["1"]
    case "range":
      return { value: 5, op: "<=" }
    case "toggle":
      return "include"
    case "text":
      return "q"
  }
}
