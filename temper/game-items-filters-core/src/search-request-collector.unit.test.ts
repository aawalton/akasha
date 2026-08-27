import { describe, expect, it } from "bun:test"
import { createSearchRequestCollector } from "./filter-types"

describe("createSearchRequestCollector", () => {
  it("starts empty", () => {
    const req = createSearchRequestCollector()
    expect(req.terms.size).toBe(0)
    expect(req.ranges.size).toBe(0)
  })

  it("accumulates exact terms for a field", () => {
    const req = createSearchRequestCollector()
    req.addExactTerms("quality", [3, 4, 5])
    expect(req.terms.get("quality")).toEqual([3, 4, 5])
  })

  it("contributes nothing for an empty term list", () => {
    const req = createSearchRequestCollector()
    req.addExactTerms("quality", [])
    expect(req.terms.size).toBe(0)
    expect(req.terms.get("quality")).toBeUndefined()
  })

  it("unions and dedupes repeated addExactTerms for the same field", () => {
    const req = createSearchRequestCollector()
    req.addExactTerms("trait", [1, 11])
    req.addExactTerms("trait", [11, 21, 1])
    expect(req.terms.get("trait")).toEqual([1, 11, 21])
  })

  it("keeps distinct fields independent", () => {
    const req = createSearchRequestCollector()
    req.addExactTerms("quality", [5])
    req.addExactTerms("trait", [1])
    expect(req.terms.get("quality")).toEqual([5])
    expect(req.terms.get("trait")).toEqual([1])
  })

  it("records an inclusive range band", () => {
    const req = createSearchRequestCollector()
    req.setRange("level", 0, 50)
    expect(req.ranges.get("level")).toEqual([0, 50])
  })

  it("last setRange wins for a field", () => {
    const req = createSearchRequestCollector()
    req.setRange("level", 0, 50)
    req.setRange("level", 10, 20)
    expect(req.ranges.get("level")).toEqual([10, 20])
  })
})
