import { describe, expect, it } from "bun:test"
import { keysOf, valuesOf } from "@temper/shared-formula-framework/object-utils"
import { mapOf } from "@temper/shared-formula-framework/utils/map-of"
import { groupByCount, indexBy } from "./utils"

describe("keysOf", () => {
  it("returns the keys of an object", () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(keysOf(obj)).toEqual(["a", "b", "c"])
  })

  it("returns a single key for a single-property object", () => {
    const obj = { only: true }
    expect(keysOf(obj)).toEqual(["only"])
  })

  it("returns an empty array for an empty object", () => {
    const obj: Record<string, unknown> = {}
    const keys: readonly string[] = keysOf(obj)
    expect(keys).toEqual([])
  })
})

describe("valuesOf", () => {
  it("returns the values of an object", () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(valuesOf(obj)).toEqual([1, 2, 3])
  })

  it("returns a single value for a single-property object", () => {
    const obj = { only: "hello" }
    expect(valuesOf(obj)).toEqual(["hello"])
  })

  it("returns an empty array for an empty object", () => {
    const obj: Record<string, unknown> = {}
    const values: readonly unknown[] = valuesOf(obj)
    expect(values).toEqual([])
  })
})

describe("mapOf", () => {
  it("maps over an array and transforms each element", () => {
    const arr = [1, 2, 3]
    expect(mapOf(arr, (n) => n * 2)).toEqual([2, 4, 6])
  })

  it("maps over an array of objects", () => {
    const arr = [{ value: 10 }, { value: 20 }]
    expect(mapOf(arr, (item) => item.value)).toEqual([10, 20])
  })

  it("returns an empty array when given an empty array", () => {
    expect(mapOf([], (n) => n)).toEqual([])
  })
})

describe("indexBy", () => {
  it("creates a record indexed by the specified key", () => {
    const skills = [
      { id: "skill-1", name: "Puncture" },
      { id: "skill-2", name: "Pierce Armor" },
    ]
    const result = indexBy(skills, "id")
    expect(result).toEqual({
      "skill-1": { id: "skill-1", name: "Puncture" },
      "skill-2": { id: "skill-2", name: "Pierce Armor" },
    })
  })

  it("uses the last item when there are duplicate key values", () => {
    const items = [
      { id: "x", value: 1 },
      { id: "x", value: 2 },
    ]
    const result = indexBy(items, "id")
    expect(result["x"]).toEqual({ id: "x", value: 2 })
  })

  it("returns an empty record for an empty array", () => {
    expect(indexBy([], "id")).toEqual({})
  })

  it("coerces numeric keys to strings", () => {
    const items = [{ id: 42, name: "Answer" }]
    const result = indexBy(items, "id")
    expect(result["42"]).toEqual({ id: 42, name: "Answer" })
  })
})

describe("groupByCount", () => {
  it("counts occurrences of each key", () => {
    type Trait = "divines" | "infused" | "sturdy"
    const items: { trait: Trait }[] = [
      { trait: "divines" },
      { trait: "divines" },
      { trait: "infused" },
    ]
    const result = groupByCount(items, (item) => item.trait)
    expect(result).toEqual([
      ["divines", 2],
      ["infused", 1],
    ])
  })

  it("excludes items where the extractor returns null", () => {
    const items: { trait: string | null }[] = [
      { trait: "divines" },
      { trait: null },
      { trait: null },
    ]
    const result = groupByCount(items, (item) => item.trait)
    expect(result).toEqual([["divines", 1]])
  })

  it("returns an empty array for an empty input", () => {
    expect(groupByCount([], () => null)).toEqual([])
  })

  it("returns an empty array when all items return null", () => {
    const items = [{ trait: null }, { trait: null }]
    const result = groupByCount(items, (item) => item.trait)
    expect(result).toEqual([])
  })

  it("preserves insertion order of keys", () => {
    const items = ["c", "a", "b", "a", "c", "c"].map((v) => ({ v }))
    const result = groupByCount(items, (item) => item.v)
    expect(result).toEqual([
      ["c", 3],
      ["a", 2],
      ["b", 1],
    ])
  })
})
