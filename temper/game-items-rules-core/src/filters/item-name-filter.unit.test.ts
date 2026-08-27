import { describe, expect, it } from "bun:test"
import { itemNameFilter } from "./item-name-filter"

describe("itemNameFilter.isPresent", () => {
  it("is absent when itemNamePattern is undefined", () => {
    expect(itemNameFilter.isPresent({})).toBe(false)
  })

  it("is absent when itemNamePattern is the empty string", () => {
    expect(itemNameFilter.isPresent({ itemNamePattern: "" })).toBe(false)
  })

  it("is absent when itemNamePattern is whitespace only", () => {
    expect(itemNameFilter.isPresent({ itemNamePattern: "   " })).toBe(false)
    expect(itemNameFilter.isPresent({ itemNamePattern: "\t\n " })).toBe(false)
  })

  it("is present when itemNamePattern has any non-whitespace content", () => {
    expect(itemNameFilter.isPresent({ itemNamePattern: "axe" })).toBe(true)
    expect(itemNameFilter.isPresent({ itemNamePattern: "  axe  " })).toBe(true)
  })
})

describe("itemNameFilter.fingerprint", () => {
  it("returns undefined for whitespace-only pattern", () => {
    expect(itemNameFilter.fingerprint({ itemNamePattern: "   " })).toBeUndefined()
  })

  it("returns the raw pattern for non-empty input", () => {
    expect(itemNameFilter.fingerprint({ itemNamePattern: "axe" })).toBe("axe")
    expect(itemNameFilter.fingerprint({ itemNamePattern: "  axe  " })).toBe("  axe  ")
  })

  it("returns undefined when pattern is missing", () => {
    expect(itemNameFilter.fingerprint({})).toBeUndefined()
  })
})

describe("itemNameFilter.applyDefault", () => {
  it("returns an empty patch (no preselected pattern)", () => {
    expect(itemNameFilter.applyDefault()).toEqual({})
  })
})
