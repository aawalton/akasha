import { describe, expect, test } from "bun:test"
import {
  type AddonDepInput,
  findDependencyCycles,
  stripVersionSuffix,
} from "./addon-dependency-cycle"

describe("stripVersionSuffix", () => {
  test("strips a >= minimum-version suffix", () => {
    expect(stripVersionSuffix("LibAddonMenu-2.0>=41")).toBe("LibAddonMenu-2.0")
  })

  test("keeps a name with no comparator intact (preserves - . digits)", () => {
    expect(stripVersionSuffix("LibMapPins-1.0")).toBe("LibMapPins-1.0")
    expect(stripVersionSuffix("LibAddonMenu-2.0")).toBe("LibAddonMenu-2.0")
  })

  test("strips other comparators", () => {
    expect(stripVersionSuffix("Foo>5")).toBe("Foo")
    expect(stripVersionSuffix("Foo<=9")).toBe("Foo")
    expect(stripVersionSuffix("Foo=3")).toBe("Foo")
  })

  test("trims surrounding whitespace", () => {
    expect(stripVersionSuffix("  Bar >= 2 ")).toBe("Bar")
  })
})

describe("findDependencyCycles", () => {
  test("acyclic graph yields no violations", () => {
    const inputs: readonly AddonDepInput[] = [
      { addonName: "App", deps: ["LibA", "LibB"] },
      { addonName: "LibA", deps: ["LibB"] },
      { addonName: "LibB", deps: [] },
    ]
    expect(findDependencyCycles(inputs)).toEqual([])
  })

  test("detects a 2-cycle (the LAM ⇄ LHAS shape)", () => {
    const inputs: readonly AddonDepInput[] = [
      { addonName: "LibAddonMenu-2.0", deps: ["LibHarvensAddonSettings"] },
      { addonName: "LibHarvensAddonSettings", deps: ["LibAddonMenu-2.0"] },
    ]
    const violations = findDependencyCycles(inputs)
    expect(violations).toHaveLength(1)
    expect(violations[0]?.cycle).toEqual(["LibAddonMenu-2.0", "LibHarvensAddonSettings"])
    expect(violations[0]?.message).toContain("LibAddonMenu-2.0 → LibHarvensAddonSettings")
  })

  test("detects a self-loop as a single-element cycle", () => {
    const inputs: readonly AddonDepInput[] = [{ addonName: "Solo", deps: ["Solo"] }]
    const violations = findDependencyCycles(inputs)
    expect(violations).toHaveLength(1)
    expect(violations[0]?.cycle).toEqual(["Solo"])
  })

  test("detects a 3-cycle", () => {
    const inputs: readonly AddonDepInput[] = [
      { addonName: "A", deps: ["B"] },
      { addonName: "B", deps: ["C"] },
      { addonName: "C", deps: ["A"] },
    ]
    const violations = findDependencyCycles(inputs)
    expect(violations).toHaveLength(1)
    expect(violations[0]?.cycle).toEqual(["A", "B", "C"])
  })

  test("strips version suffixes before building the graph", () => {
    const inputs: readonly AddonDepInput[] = [
      { addonName: "X", deps: ["Y>=10"] },
      { addonName: "Y", deps: ["X>=2"] },
    ]
    const violations = findDependencyCycles(inputs)
    expect(violations).toHaveLength(1)
    expect(violations[0]?.cycle).toEqual(["X", "Y"])
  })

  test("edges to un-discovered external addons never close a cycle", () => {
    const inputs: readonly AddonDepInput[] = [
      { addonName: "Mine", deps: ["TamrielTradeCentre", "IIfA"] },
    ]
    expect(findDependencyCycles(inputs)).toEqual([])
  })

  test("reports each distinct cycle once across a larger graph", () => {
    const inputs: readonly AddonDepInput[] = [
      { addonName: "A", deps: ["B"] },
      { addonName: "B", deps: ["A"] },
      { addonName: "C", deps: ["D"] },
      { addonName: "D", deps: ["C"] },
      { addonName: "E", deps: ["A", "C"] },
    ]
    const violations = findDependencyCycles(inputs)
    expect(violations.map((v) => v.cycle)).toEqual([
      ["A", "B"],
      ["C", "D"],
    ])
  })
})
