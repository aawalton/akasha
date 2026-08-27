import { describe, expect, it } from "bun:test"
import type { CategoryRule, MoveToDestination } from "../inventory-rule-types"
import { ruleFingerprint } from "./rule-fingerprint"

function rule(
  categoryId: string,
  conditions?: CategoryRule["conditions"],
  action: CategoryRule["action"] = "sell",
  destination?: MoveToDestination
): CategoryRule {
  return { id: "r1", categoryId, action, conditions, destination }
}

describe("ruleFingerprint", () => {
  it("returns categoryId|action|destination for unconditional rule", () => {
    expect(ruleFingerprint(rule("treasure"))).toBe("treasure|sell|")
  })

  it("includes stolen condition", () => {
    expect(ruleFingerprint(rule("treasure", { stolen: "stolen" }))).toBe(
      "treasure|sell||stolen:stolen"
    )
  })

  it("includes not-stolen condition", () => {
    expect(ruleFingerprint(rule("treasure", { stolen: "not-stolen" }))).toBe(
      "treasure|sell||stolen:not-stolen"
    )
  })

  it("includes crafted condition", () => {
    expect(ruleFingerprint(rule("equipment", { crafted: "crafted" }))).toBe(
      "equipment|sell||crafted:crafted"
    )
  })

  it("includes traits sorted alphabetically", () => {
    expect(ruleFingerprint(rule("equipment", { traits: ["infused", "divines"] }))).toBe(
      "equipment|sell||traits:divines,infused"
    )
  })

  it("produces same fingerprint regardless of trait order", () => {
    const a = ruleFingerprint(rule("equipment", { traits: ["sturdy", "divines", "infused"] }))
    const b = ruleFingerprint(rule("equipment", { traits: ["divines", "infused", "sturdy"] }))
    expect(a).toBe(b)
  })

  it("treats empty traits array as no traits", () => {
    const withEmpty = ruleFingerprint(rule("equipment", { traits: [] }))
    const without = ruleFingerprint(rule("equipment"))
    expect(withEmpty).toBe(without)
  })

  it("treats undefined conditions as no conditions", () => {
    const withUndefined = ruleFingerprint(rule("equipment", undefined))
    const without = ruleFingerprint(rule("equipment"))
    expect(withUndefined).toBe(without)
  })

  it("includes maxQuality", () => {
    expect(ruleFingerprint(rule("equipment", { maxQuality: 3 }))).toBe("equipment|sell||quality:3")
  })

  it("includes maxLevel", () => {
    expect(ruleFingerprint(rule("equipment", { maxLevel: 50 }))).toBe("equipment|sell||level:50")
  })

  it("includes set source types sorted", () => {
    expect(
      ruleFingerprint(rule("equipment", { setSourceTypes: ["dungeon", "crafted", "overland"] }))
    ).toBe("equipment|sell||set-sources:crafted,dungeon,overland")
  })

  it("treats empty setSourceTypes as no filter", () => {
    const withEmpty = ruleFingerprint(rule("equipment", { setSourceTypes: [] }))
    const without = ruleFingerprint(rule("equipment"))
    expect(withEmpty).toBe(without)
  })

  it("includes multiple conditions in registry order", () => {
    expect(
      ruleFingerprint(rule("equipment", { maxQuality: 3, stolen: "stolen", maxLevel: 50 }))
    ).toBe("equipment|sell||quality:3|level:50|stolen:stolen")
  })

  it("different conditions produce different fingerprints", () => {
    const stolen = ruleFingerprint(rule("treasure", { stolen: "stolen" }))
    const notStolen = ruleFingerprint(rule("treasure", { stolen: "not-stolen" }))
    const plain = ruleFingerprint(rule("treasure"))
    expect(stolen).not.toBe(notStolen)
    expect(stolen).not.toBe(plain)
    expect(notStolen).not.toBe(plain)
  })

  it("same conditions produce same fingerprint regardless of rule id", () => {
    const a: CategoryRule = {
      id: "abc",
      categoryId: "treasure",
      action: "sell",
      conditions: { stolen: "stolen" },
    }
    const b: CategoryRule = {
      id: "xyz",
      categoryId: "treasure",
      action: "sell",
      conditions: { stolen: "stolen" },
    }
    expect(ruleFingerprint(a)).toBe(ruleFingerprint(b))
  })

  it("different actions produce different fingerprints", () => {
    const sell = ruleFingerprint(rule("treasure", { stolen: "stolen" }, "sell"))
    const destroy = ruleFingerprint(rule("treasure", { stolen: "stolen" }, "destroy"))
    expect(sell).not.toBe(destroy)
  })

  it("different destinations produce different fingerprints", () => {
    const bank = ruleFingerprint(rule("equipment", undefined, "move-to", "bank"))
    const house = ruleFingerprint(rule("equipment", undefined, "move-to", "house-storage"))
    expect(bank).not.toBe(house)
  })

  it("includes destination in fingerprint", () => {
    expect(ruleFingerprint(rule("equipment", undefined, "move-to", "bank"))).toBe(
      "equipment|move-to|bank"
    )
  })

  it("includes can-research in fingerprint", () => {
    expect(ruleFingerprint(rule("equipment", { canResearch: "can-research" }))).toBe(
      "equipment|sell||can-research:can-research"
    )
  })

  it("includes can-inspire in fingerprint", () => {
    expect(ruleFingerprint(rule("equipment", { canInspire: "can-inspire" }))).toBe(
      "equipment|sell||can-inspire:can-inspire"
    )
  })

  it("includes can-unlock in fingerprint", () => {
    expect(ruleFingerprint(rule("equipment", { canUnlock: "can-unlock" }))).toBe(
      "equipment|sell||can-unlock:can-unlock"
    )
  })
})
