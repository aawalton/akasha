import { describe, expect, it } from "bun:test"
import type {
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationData,
} from "../lib/temper-inventory/game-item-types.ts"
import { buildMatcherContext } from "../lib/temper-inventory/inventory-plan-inputs.ts"
import type { CharacterKnowledge } from "../lib/temper-inventory/parse-temper-characters.ts"
import type { CompiledInventoryConfig } from "../lib/temper-inventory/parse-temper-inventory-config.ts"

const DUBIOUS = 120763
const OTHER = 999

function item(itemId: number, stackCount: number): InventoryItemData {
  return {
    itemId,
    itemName: `item-${itemId}`,
    itemLink: "",
    quality: 1,
    filterType: 0,
    itemType: 0,
    traitType: 0,
    requiredLevel: 0,
    requiredCP: 0,
    stackCount,
  }
}

function loc(
  displayName: string,
  bags: Record<number, Record<number, InventoryItemData>>
): InventoryLocationData {
  return { bags, displayName, lastScanned: 0 }
}

function makeDb(locations: Record<string, InventoryLocationData>): InventoryDatabase {
  return { locations, meta: { displayName: "acct", worldName: "NA", lastFullScan: 0 } }
}

function makeConfig(
  wantedConsumables: Record<string, unknown>,
  characterPriority: readonly string[] = []
): CompiledInventoryConfig {
  return { rules: [], orderedRules: [], wantedConsumables, characterPriority }
}

const NO_CHARACTERS: ReadonlyMap<string, CharacterKnowledge> = new Map()

const MIXED_DB = makeDb({
  "1": loc("Char One", {
    0: { 0: item(DUBIOUS, 50), 1: item(OTHER, 5) },
    1: { 0: item(DUBIOUS, 38) },
  }),
  Bank: loc("Bank", { 0: { 0: item(DUBIOUS, 1621) } }),
})

describe("buildMatcherContext — consumableStock", () => {
  it("scans character (numeric) locations for wanted items, excluding the Bank", () => {
    const ctx = buildMatcherContext(
      makeConfig({ [DUBIOUS]: ["1"] }, ["1"]),
      NO_CHARACTERS,
      MIXED_DB
    )
    const perChar = ctx.consumableStock.get(DUBIOUS)
    expect(perChar).toBeDefined()
    expect(perChar?.get("1")).toBe(88)
    expect(ctx.consumableStock.get(OTHER)).toBeUndefined()
  })

  it("is empty when the wanters map is empty (vacuous-truth faithful case)", () => {
    const ctx = buildMatcherContext(makeConfig({}), NO_CHARACTERS, MIXED_DB)
    expect(ctx.consumableStock.size).toBe(0)
  })
})

describe("buildMatcherContext — bankStock", () => {
  it("sums the Bank location only, keyed by itemId", () => {
    const ctx = buildMatcherContext(makeConfig({ [DUBIOUS]: ["1"] }), NO_CHARACTERS, MIXED_DB)
    expect(ctx.bankStock.get(DUBIOUS)).toBe(1621)
    expect(ctx.bankStock.get(OTHER)).toBeUndefined()
  })

  it("is empty when there is no Bank location", () => {
    const ctx = buildMatcherContext(
      makeConfig({ [DUBIOUS]: ["1"] }),
      NO_CHARACTERS,
      makeDb({ "1": loc("Char One", { 0: { 0: item(DUBIOUS, 10) } }) })
    )
    expect(ctx.bankStock.size).toBe(0)
  })
})

describe("buildMatcherContext — wantedConsumables coercion", () => {
  const ctx = buildMatcherContext(
    makeConfig({
      [DUBIOUS]: ["1", "2"],
      "87697": { "1": "charA", "2": "charB" },
      notanum: ["x"],
      "555": [],
    }),
    NO_CHARACTERS,
    makeDb({})
  )

  it("coerces array-valued entries", () => {
    expect(ctx.wantedConsumables.get(DUBIOUS)).toEqual(["1", "2"])
  })

  it("coerces Lua-record-valued entries to a string[]", () => {
    expect(ctx.wantedConsumables.get(87697)).toEqual(["charA", "charB"])
  })

  it("skips non-numeric keys and empty values", () => {
    expect(ctx.wantedConsumables.size).toBe(2)
    expect(ctx.wantedConsumables.has(DUBIOUS)).toBe(true)
    expect(ctx.wantedConsumables.has(87697)).toBe(true)
  })
})

describe("buildMatcherContext — passthrough", () => {
  it("carries characterPriority from the compiled config", () => {
    const priority = ["3", "1", "2"] as const
    const ctx = buildMatcherContext(makeConfig({}, priority), NO_CHARACTERS, makeDb({}))
    expect(ctx.characterPriority).toEqual(priority)
  })
})
