import { describe, expect, it } from "bun:test"
import { requireFirst } from "../../../shared/utils-narrow/src/require-first"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { makeItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
} from "@temper/game-items-rules-core/inventory-rule-types"
import { computeAllRuleAffectedItems } from "./inventory-rule-matcher"
import {
  type AllRuleAffectedItemsCache,
  categoryRuleFingerprint,
  createAllRuleAffectedItemsCache,
  residueEntriesEqual,
  residuesToEntries,
  restoreResiduesFromEntries,
} from "./inventory-rule-matcher-cache"

function classify(
  itemId: number,
  nodeIds: readonly string[],
  overrides: Partial<Omit<ClassifiedInventoryItem, "item" | "nodeIds">> = {}
): ClassifiedInventoryItem {
  return {
    item: makeItem({ itemId }),
    locationKey: overrides.locationKey ?? "1001",
    locationDisplayName: overrides.locationDisplayName ?? "Azara",
    nodeIds,
    bagId: overrides.bagId ?? 1,
  }
}

function rule(overrides: Partial<CategoryRule> & { id: string }): CompiledOrderedRule {
  return compileCategoryRuleToOrdered({
    categoryId: ALL_CATEGORIES_ID,
    action: "sell",
    ...overrides,
  })
}

describe("categoryRuleFingerprint", () => {
  it("returns the same fingerprint for two structurally identical rules", () => {
    const a = rule({ id: "a", categoryId: "weapons", action: "sell" })
    const b = rule({ id: "a", categoryId: "weapons", action: "sell" })
    expect(categoryRuleFingerprint(a)).toBe(categoryRuleFingerprint(b))
  })

  it("changes when any field that affects matching changes", () => {
    const base = rule({ id: "a", categoryId: "weapons", action: "sell" })
    const fpBase = categoryRuleFingerprint(base)

    expect(categoryRuleFingerprint({ ...base, action: "deconstruct" })).not.toBe(fpBase)
    expect(categoryRuleFingerprint({ ...base, categoryId: "armor" })).not.toBe(fpBase)
    expect(categoryRuleFingerprint({ ...base, active: false })).not.toBe(fpBase)
    expect(categoryRuleFingerprint({ ...base, stolen: "stolen" })).not.toBe(fpBase)
  })
})

describe("residuesToEntries / restoreResiduesFromEntries", () => {
  it("is a faithful round-trip — restored map has the same residue values", () => {
    const [item0, item1, item2] = [
      classify(1, ["equipment", "weapons"]),
      classify(2, ["equipment", "armor"]),
      classify(3, ["consumables"]),
    ] as const
    const items = [item0, item1, item2]
    const original = new Map<ClassifiedInventoryItem, number>([
      [item0, 0],
      [item2, 0],
    ])

    const entries = residuesToEntries(original, items)
    const restored = new Map<ClassifiedInventoryItem, number>()
    restoreResiduesFromEntries(restored, items, entries)

    expect(restored.get(item0)).toBe(0)
    expect(restored.has(item1)).toBe(false)
    expect(restored.get(item2)).toBe(0)
    expect(restored.size).toBe(original.size)
  })

  it("omits entries equal to the CI's full stackCount (default residue)", () => {
    const [item0, item1] = [classify(1, ["a"]), classify(2, ["a"])] as const
    const items = [item0, item1]
    const residues = new Map<ClassifiedInventoryItem, number>([
      [item0, item0.item.stackCount],
      [item1, 0],
    ])
    const entries = residuesToEntries(residues, items)
    expect(entries).toHaveLength(1)
    expect(entries[0]?.[0]).toBe(1)
    expect(entries[0]?.[1]).toBe(0)
  })

  it("returns sorted entries so equal residue maps compare equal", () => {
    const [item0, item1, item2] = [
      classify(1, ["a"]),
      classify(2, ["a"]),
      classify(3, ["a"]),
    ] as const
    const items = [item0, item1, item2]
    const mapA = new Map<ClassifiedInventoryItem, number>([
      [item2, 0],
      [item0, 0],
    ])
    const mapB = new Map<ClassifiedInventoryItem, number>([
      [item0, 0],
      [item2, 0],
    ])
    expect(
      residueEntriesEqual(residuesToEntries(mapA, items), residuesToEntries(mapB, items))
    ).toBe(true)
  })

  it("clears the destination map before restoring", () => {
    const [item0, item1] = [classify(1, ["a"]), classify(2, ["a"])] as const
    const items = [item0, item1]
    const target = new Map<ClassifiedInventoryItem, number>([[item0, 0]])
    restoreResiduesFromEntries(target, items, [[1, 0]])
    expect(target.has(item0)).toBe(false)
    expect(target.get(item1)).toBe(0)
  })
})

describe("residueEntriesEqual", () => {
  it("requires identical content and order", () => {
    expect(
      residueEntriesEqual(
        [
          [1, 0],
          [2, 0],
          [3, 0],
        ],
        [
          [1, 0],
          [2, 0],
          [3, 0],
        ]
      )
    ).toBe(true)
    expect(
      residueEntriesEqual(
        [
          [1, 0],
          [2, 0],
          [3, 0],
        ],
        [
          [1, 0],
          [2, 0],
        ]
      )
    ).toBe(false)
    expect(
      residueEntriesEqual(
        [
          [1, 0],
          [2, 0],
          [3, 0],
        ],
        [
          [3, 0],
          [2, 0],
          [1, 0],
        ]
      )
    ).toBe(false)
    expect(residueEntriesEqual([], [])).toBe(true)
  })

  it("treats different residue values at the same index as not equal", () => {
    expect(residueEntriesEqual([[0, 1]], [[0, 2]])).toBe(false)
  })
})

describe("computeAllRuleAffectedItems with cache", () => {
  it("matches a fresh recompute on a full cache hit (all rules unchanged)", () => {
    const items = [classify(1, ["equipment", "weapons", "sword"]), classify(2, ["consumables"])]
    const rules = [
      rule({ id: "a", categoryId: "weapons", action: "sell" }),
      rule({ id: "b", categoryId: ALL_CATEGORIES_ID, action: "lock" }),
    ]

    const fresh = computeAllRuleAffectedItems(rules, items)

    const cache = createAllRuleAffectedItemsCache()
    computeAllRuleAffectedItems(rules, items, undefined, undefined, cache)
    const cached = computeAllRuleAffectedItems(rules, items, undefined, undefined, cache)

    expect([...cached.ruleMap.entries()]).toEqual([...fresh.ruleMap.entries()])
  })

  it("matches a from-scratch recompute when a single rule is edited", () => {
    const items = [
      classify(1, ["equipment", "weapons", "sword"]),
      classify(2, ["equipment", "armor", "chest"]),
      classify(3, ["consumables"]),
    ]
    const initial = [
      rule({ id: "a", categoryId: "weapons", action: "sell" }),
      rule({ id: "b", categoryId: "armor", action: "deconstruct" }),
    ]
    const edited = [
      rule({ id: "a", categoryId: "weapons", action: "sell" }),
      rule({ id: "b", categoryId: "armor", action: "lock" }),
    ]

    const cache = createAllRuleAffectedItemsCache()
    computeAllRuleAffectedItems(initial, items, undefined, undefined, cache)
    const incremental = computeAllRuleAffectedItems(edited, items, undefined, undefined, cache)

    const fresh = computeAllRuleAffectedItems(edited, items)

    expect([...incremental.ruleMap.entries()]).toEqual([...fresh.ruleMap.entries()])
  })

  it("matches a from-scratch recompute when a rule is added at the front (first-match-wins shifts)", () => {
    const items = [
      classify(1, ["equipment", "weapons", "sword"]),
      classify(2, ["equipment", "armor", "chest"]),
    ]
    const initial = [rule({ id: "armor", categoryId: "armor", action: "deconstruct" })]
    const expanded = [
      rule({ id: "all-first", categoryId: ALL_CATEGORIES_ID, action: "lock" }),
      rule({ id: "armor", categoryId: "armor", action: "deconstruct" }),
    ]

    const cache = createAllRuleAffectedItemsCache()
    computeAllRuleAffectedItems(initial, items, undefined, undefined, cache)
    const incremental = computeAllRuleAffectedItems(expanded, items, undefined, undefined, cache)

    const fresh = computeAllRuleAffectedItems(expanded, items)

    expect([...incremental.ruleMap.entries()]).toEqual([...fresh.ruleMap.entries()])
  })

  it("matches a from-scratch recompute when a rule is removed from the middle", () => {
    const items = [
      classify(1, ["equipment", "weapons", "sword"]),
      classify(2, ["equipment", "armor", "chest"]),
      classify(3, ["consumables"]),
    ]
    const before = [
      rule({ id: "weapons", categoryId: "weapons", action: "sell" }),
      rule({ id: "consumables", categoryId: "consumables", action: "lock" }),
      rule({ id: "armor", categoryId: "armor", action: "deconstruct" }),
    ]
    const after = [
      rule({ id: "weapons", categoryId: "weapons", action: "sell" }),
      rule({ id: "armor", categoryId: "armor", action: "deconstruct" }),
    ]

    const cache = createAllRuleAffectedItemsCache()
    computeAllRuleAffectedItems(before, items, undefined, undefined, cache)
    const incremental = computeAllRuleAffectedItems(after, items, undefined, undefined, cache)

    const fresh = computeAllRuleAffectedItems(after, items)

    expect([...incremental.ruleMap.entries()]).toEqual([...fresh.ruleMap.entries()])
  })

  it("invalidates and recomputes when classifiedItems reference changes", () => {
    const itemsA = [classify(1, ["consumables"])]
    const itemsB = [classify(2, ["consumables"])]
    const rules = [rule({ id: "a", categoryId: "consumables", action: "lock" })]

    const cache = createAllRuleAffectedItemsCache()
    computeAllRuleAffectedItems(rules, itemsA, undefined, undefined, cache)
    const result = computeAllRuleAffectedItems(rules, itemsB, undefined, undefined, cache)

    expect(result.ruleMap.get("a")?.map((a) => a.item.itemId)).toEqual([2])
  })

  it("primes lastResult and snapshots on first call", () => {
    const items = [classify(1, ["consumables"])]
    const rules = [rule({ id: "a", categoryId: "consumables", action: "lock" })]
    const cache: AllRuleAffectedItemsCache = createAllRuleAffectedItemsCache()

    expect(cache.lastResult).toBeNull()
    computeAllRuleAffectedItems(rules, items, undefined, undefined, cache)

    expect(cache.lastResult).not.toBeNull()
    expect(cache.snapshots).toHaveLength(rules.length + 1)
    expect(requireFirst(cache.snapshots, "cache.snapshots").fingerprint).toBe(
      categoryRuleFingerprint(requireFirst(rules, "rules"))
    )
  })
})
