import { describe, expect, it } from "bun:test"
import type { InventoryDatabase } from "@temper/game-items-core/inventory-types"
import { makeItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import type { CompletionCharacterInput } from "@temper/game-items-rules-core/rule-matcher-context-types"
import {
  compileBankStock,
  compileConsumableStock,
  compileKnownMotifs,
  compileKnownMotifsByStyleId,
  compileKnownRecipes,
  compileKnownScripts,
  compileResearchableTraits,
} from "./rule-matcher-context-knowledge"

function char(esoCharacterId: string, completion: unknown): CompletionCharacterInput {
  return { esoCharacterId, targetBuildId: null, sortOrder: 0, completion }
}

function emptyInventory(): InventoryDatabase {
  return {
    locations: {},
    meta: { displayName: "Account", worldName: "NA Megaserver", lastFullScan: 0 },
  }
}

describe("compileKnownRecipes", () => {
  it("emits an entry per character with their known itemIds", () => {
    const a = char("1001", { recipes: { 0: [100, 101] } })
    const b = char("1002", { recipes: { 0: [200] } })

    const result = compileKnownRecipes([a, b])

    expect(result.get("1001")).toEqual(new Set([100, 101]))
    expect(result.get("1002")).toEqual(new Set([200]))
  })

  it("treats sparse number[] and Record<string,number> formats as equivalent", () => {
    const sparse = char("1001", { recipes: { 0: [100, 101] } })
    const luaNormalised = char("1002", { recipes: { 0: { "1": 100, "2": 101 } } })

    const result = compileKnownRecipes([sparse, luaNormalised])

    expect(result.get("1001")).toEqual(result.get("1002"))
  })

  it("reads exhaustive `{ name, recipes }` shape — only `known: true` survives", () => {
    const exhaustive = char("1001", {
      recipes: {
        0: {
          name: "Provisioning",
          recipes: {
            "100": { known: true },
            "101": { known: false },
            "102": { known: true },
          },
        },
      },
    })

    expect(compileKnownRecipes([exhaustive]).get("1001")).toEqual(new Set([100, 102]))
  })

  it("skips characters whose completion has no recipes field", () => {
    const noRecipes = char("1001", { otherField: "x" })
    expect(compileKnownRecipes([noRecipes]).has("1001")).toBe(false)
  })

  it("returns an empty map for an empty character list", () => {
    expect(compileKnownRecipes([]).size).toBe(0)
  })
})

describe("compileKnownMotifs", () => {
  it("only surfaces motif knowledge from category 2 (Crafting Motifs)", () => {
    const c = char("1001", {
      loreLibrary: {
        1: { 0: [1, 2, 3] },
        2: { 7: [1, 5, 9] },
      },
    })

    const result = compileKnownMotifs([c])
    const charMap = result.get("1001")

    expect(charMap?.has(7)).toBe(true)
    expect(charMap?.get(7)).toEqual(new Set([1, 5, 9]))
    expect(charMap?.has(0)).toBe(false)
  })

  it("treats sparse number[] and Record<string,number> book shapes as equivalent", () => {
    const sparse = char("1001", { loreLibrary: { 2: { 7: [1, 2] } } })
    const luaNormalised = char("1002", { loreLibrary: { 2: { 7: { "1": 1, "2": 2 } } } })

    const result = compileKnownMotifs([sparse, luaNormalised])
    expect(result.get("1001")?.get(7)).toEqual(result.get("1002")?.get(7))
  })

  it("drops collections whose book set is empty", () => {
    const c = char("1001", { loreLibrary: { 2: { 7: [], 8: [42] } } })
    const charMap = compileKnownMotifs([c]).get("1001")
    expect(charMap?.has(7)).toBe(false)
    expect(charMap?.has(8)).toBe(true)
  })
})

describe("compileKnownMotifsByStyleId", () => {
  it("emits a (styleId → chapterId set) map per character", () => {
    const c = char("1001", { motifKnowledge: { 5: [1, 4, 14], 29: [3] } })
    const result = compileKnownMotifsByStyleId([c])
    const charMap = result.get("1001")
    expect(charMap?.get(5)).toEqual(new Set([1, 4, 14]))
    expect(charMap?.get(29)).toEqual(new Set([3]))
  })

  it("covers racial styles (1..14) that have no lore-library entries", () => {
    const c = char("1001", {
      motifKnowledge: { 1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
    })
    const result = compileKnownMotifsByStyleId([c])
    expect(result.get("1001")?.get(1)?.size).toBe(14)
  })

  it("treats sparse number[] and Record<string,number> chapter shapes as equivalent", () => {
    const sparse = char("1001", { motifKnowledge: { 5: [1, 4, 14] } })
    const luaNormalised = char("1002", { motifKnowledge: { 5: { "1": 1, "2": 4, "3": 14 } } })
    const result = compileKnownMotifsByStyleId([sparse, luaNormalised])
    expect(result.get("1001")?.get(5)).toEqual(result.get("1002")?.get(5))
  })

  it("drops styles whose chapter set is empty", () => {
    const c = char("1001", { motifKnowledge: { 5: [], 6: [1] } })
    const charMap = compileKnownMotifsByStyleId([c]).get("1001")
    expect(charMap?.has(5)).toBe(false)
    expect(charMap?.has(6)).toBe(true)
  })

  it("returns an entry with an empty map when the character has no motifKnowledge field", () => {
    const c = char("1001", { loreLibrary: { 2: { 7: [1, 5] } } })
    const result = compileKnownMotifsByStyleId([c])
    const charMap = result.get("1001")
    expect(charMap).toBeDefined()
    expect(charMap?.size).toBe(0)
  })

  it("returns an empty top-level map for an empty character list", () => {
    expect(compileKnownMotifsByStyleId([])).toEqual(new Map())
  })
})

describe("compileResearchableTraits", () => {
  it("marks a trait `false` if any research line for the same craft type still needs it", () => {
    const c = char("1001", {
      traitResearch: {
        1: {
          lines: {
            0: { traits: { 0: { name: "Divines", known: true } } },
            1: { traits: { 0: { name: "Divines", known: false } } },
          },
        },
      },
    })

    const charMap = compileResearchableTraits([c]).get("1001")
    expect(charMap?.get(1)?.get("divines")).toBe(false)
  })

  it("marks a trait `true` only when every line that has it has it learned", () => {
    const c = char("1001", {
      traitResearch: {
        1: {
          lines: {
            0: { traits: { 0: { name: "Divines", known: true } } },
            1: { traits: { 0: { name: "Divines", known: true } } },
          },
        },
      },
    })

    expect(compileResearchableTraits([c]).get("1001")?.get(1)?.get("divines")).toBe(true)
  })

  it("uses the lowercased trait name as the key", () => {
    const c = char("1001", {
      traitResearch: {
        1: { lines: { 0: { traits: { 0: { name: "INFUSED", known: false } } } } },
      },
    })
    expect(compileResearchableTraits([c]).get("1001")?.get(1)?.has("infused")).toBe(true)
  })

  it("skips characters with no traitResearch field", () => {
    const c = char("1001", {})
    expect(compileResearchableTraits([c]).has("1001")).toBe(false)
  })
})

describe("compileKnownScripts", () => {
  it("returns an empty set when no scripts are unlocked", () => {
    const c = char("1001", { scribing: { scripts: {} } })
    expect(compileKnownScripts([c]).get("1001")).toEqual(new Set())
  })

  it("ignores scripts that aren't unlocked", () => {
    const c = char("1001", {
      scribing: {
        scripts: {
          "1": { name: "Empower", unlocked: false },
        },
      },
    })
    expect(compileKnownScripts([c]).get("1001")?.size).toBe(0)
  })

  it("skips characters with no scribing field", () => {
    const c = char("1001", {})
    expect(compileKnownScripts([c]).has("1001")).toBe(false)
  })
})

describe("compileBankStock", () => {
  it("returns an empty map when there is no inventory", () => {
    expect(compileBankStock(null).size).toBe(0)
  })

  it("returns an empty map when the inventory has no Bank location", () => {
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        "1001": {
          bags: { 1: { 0: makeItem({ itemId: 100, stackCount: 5 }) } },
          displayName: "Azara",
          lastScanned: 0,
        },
      },
    }
    expect(compileBankStock(inv).size).toBe(0)
  })

  it("sums stack counts across every Bank bag, keyed by itemId", () => {
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        Bank: {
          bags: {
            2: {
              0: makeItem({ itemId: 100, stackCount: 30 }),
              1: makeItem({ itemId: 100, stackCount: 70 }),
              2: makeItem({ itemId: 200, stackCount: 5 }),
            },
            3: {
              0: makeItem({ itemId: 100, stackCount: 100 }),
            },
          },
          displayName: "Bank",
          lastScanned: 0,
        },
      },
    }

    const stock = compileBankStock(inv)
    expect(stock.get(100)).toBe(200)
    expect(stock.get(200)).toBe(5)
  })

  it("does not include items at character locations in the bank total", () => {
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        "1001": {
          bags: { 1: { 0: makeItem({ itemId: 100, stackCount: 50 }) } },
          displayName: "Azara",
          lastScanned: 0,
        },
        Bank: {
          bags: { 2: { 0: makeItem({ itemId: 100, stackCount: 10 }) } },
          displayName: "Bank",
          lastScanned: 0,
        },
      },
    }
    expect(compileBankStock(inv).get(100)).toBe(10)
  })
})

describe("compileConsumableStock", () => {
  it("returns empty when wantedConsumables is empty", () => {
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        "1001": {
          bags: { 1: { 0: makeItem({ itemId: 100, stackCount: 50 }) } },
          displayName: "Azara",
          lastScanned: 0,
        },
      },
    }
    expect(compileConsumableStock(inv, new Map()).size).toBe(0)
  })

  it("only counts items that appear in wantedConsumables", () => {
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        "1001": {
          bags: {
            1: {
              0: makeItem({ itemId: 100, stackCount: 50 }),
              1: makeItem({ itemId: 999, stackCount: 50 }),
            },
          },
          displayName: "Azara",
          lastScanned: 0,
        },
      },
    }
    const wanted = new Map([[100, ["1001"]]])
    const result = compileConsumableStock(inv, wanted)
    expect(result.get(100)?.get("1001")).toBe(50)
    expect(result.has(999)).toBe(false)
  })

  it("only counts character (numeric-key) locations, not Bank or guild", () => {
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        "1001": {
          bags: { 1: { 0: makeItem({ itemId: 100, stackCount: 30 }) } },
          displayName: "Azara",
          lastScanned: 0,
        },
        Bank: {
          bags: { 2: { 0: makeItem({ itemId: 100, stackCount: 70 }) } },
          displayName: "Bank",
          lastScanned: 0,
        },
        "Some Guild": {
          bags: { 4: { 0: makeItem({ itemId: 100, stackCount: 999 }) } },
          displayName: "Some Guild",
          lastScanned: 0,
        },
      },
    }
    const wanted = new Map([[100, ["1001"]]])
    const result = compileConsumableStock(inv, wanted)

    expect(result.get(100)?.get("1001")).toBe(30)
    expect(result.get(100)?.has("Bank")).toBe(false)
    expect(result.get(100)?.has("Some Guild")).toBe(false)
  })

  it("sums stacks per character across multiple bags of the same character location", () => {
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        "1001": {
          bags: {
            0: { 0: makeItem({ itemId: 100, stackCount: 5 }) },
            1: {
              0: makeItem({ itemId: 100, stackCount: 7 }),
              1: makeItem({ itemId: 100, stackCount: 3 }),
            },
          },
          displayName: "Azara",
          lastScanned: 0,
        },
      },
    }
    const wanted = new Map([[100, ["1001"]]])
    expect(compileConsumableStock(inv, wanted).get(100)?.get("1001")).toBe(15)
  })
})
