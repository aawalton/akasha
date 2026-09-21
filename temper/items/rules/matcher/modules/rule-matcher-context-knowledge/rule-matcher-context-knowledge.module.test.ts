import { describe, expect, test } from "bun:test"
import {
  compileBankStock,
  compileConsumableStock,
  compileKnownMotifs,
  compileKnownMotifsByStyleId,
  compileKnownRecipes,
  compileKnownScripts,
  compileResearchableTraits,
} from "akasha/temper/items/rules/matcher/modules/rule-matcher-context-knowledge/rule-matcher-context-knowledge.module.code.ts"
import {
  CHARACTER,
  holding,
  knowing,
  OTHER,
  stacked,
} from "akasha/temper/items/rules/matcher/modules/rule-matcher-context-knowledge/rule-matcher-context-knowledge.module.test-fixtures.ts"

const MOTIFS = 2

describe("A list the game wrote sparsely and one it wrote as a record say the same thing.", () => {
  test("recipes written either way come out the same", () => {
    const sparse = knowing({ recipes: { 0: [100, 101] } })
    const recorded = knowing({ recipes: { 0: { "1": 100, "2": 101 } } }, OTHER)

    const found = compileKnownRecipes([sparse, recorded])

    expect(found.get(CHARACTER)).toEqual(found.get(OTHER))
  })

  test("motif books written either way come out the same", () => {
    const sparse = knowing({ loreLibrary: { [MOTIFS]: { 7: [1, 2] } } })
    const recorded = knowing({ loreLibrary: { [MOTIFS]: { 7: { "1": 1, "2": 2 } } } }, OTHER)

    const found = compileKnownMotifs([sparse, recorded])

    expect(found.get(CHARACTER)?.get(7)).toEqual(found.get(OTHER)?.get(7))
  })

  test("motif chapters written either way come out the same", () => {
    const sparse = knowing({ motifKnowledge: { 5: [1, 4, 14] } })
    const recorded = knowing({ motifKnowledge: { 5: { "1": 1, "2": 4, "3": 14 } } }, OTHER)

    const found = compileKnownMotifsByStyleId([sparse, recorded])

    expect(found.get(CHARACTER)?.get(5)).toEqual(found.get(OTHER)?.get(5))
  })
})

describe("A recipe is known where the game says known, and the rest are left out.", () => {
  test("each character holds the recipe ids that character knows", () => {
    const found = compileKnownRecipes([
      knowing({ recipes: { 0: [100, 101] } }),
      knowing({ recipes: { 0: [200] } }, OTHER),
    ])

    expect(found.get(CHARACTER)).toEqual(new Set([100, 101]))
    expect(found.get(OTHER)).toEqual(new Set([200]))
  })

  test("a list naming each recipe keeps only the ones marked known", () => {
    const held = knowing({
      recipes: {
        0: {
          name: "Provisioning",
          recipes: { "100": { known: true }, "101": { known: false }, "102": { known: true } },
        },
      },
    })

    expect(compileKnownRecipes([held]).get(CHARACTER)).toEqual(new Set([100, 102]))
  })

  test("a character the game wrote no recipes for is left out", () => {
    expect(compileKnownRecipes([knowing({ otherField: "x" })]).has(CHARACTER)).toBe(false)
  })

  test("no characters at all hold nothing", () => {
    expect(compileKnownRecipes([]).size).toBe(0)
  })
})

describe("Only the crafting motif category of the lore library counts as motif knowledge.", () => {
  test("a collection outside that category is left out", () => {
    const held = knowing({ loreLibrary: { 1: { 0: [1, 2, 3] }, [MOTIFS]: { 7: [1, 5, 9] } } })

    const found = compileKnownMotifs([held]).get(CHARACTER)

    expect(found?.get(7)).toEqual(new Set([1, 5, 9]))
    expect(found?.has(0)).toBe(false)
  })

  test("a collection holding no book at all is left out", () => {
    const found = compileKnownMotifs([
      knowing({ loreLibrary: { [MOTIFS]: { 7: [], 8: [42] } } }),
    ]).get(CHARACTER)

    expect(found?.has(7)).toBe(false)
    expect(found?.has(8)).toBe(true)
  })
})

describe("Every character holds a motif chapter map, empty where the game wrote none.", () => {
  test("each style holds the chapters that character has", () => {
    const held = knowing({ motifKnowledge: { 5: [1, 4, 14], 29: [3] } })

    const found = compileKnownMotifsByStyleId([held]).get(CHARACTER)

    expect(found?.get(5)).toEqual(new Set([1, 4, 14]))
    expect(found?.get(29)).toEqual(new Set([3]))
  })

  test("a racial style the lore library never names is held all the same", () => {
    const chapters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    const held = knowing({ motifKnowledge: { 1: chapters } })

    expect(compileKnownMotifsByStyleId([held]).get(CHARACTER)?.get(1)?.size).toBe(chapters.length)
  })

  test("a style holding no chapter at all is left out", () => {
    const found = compileKnownMotifsByStyleId([knowing({ motifKnowledge: { 5: [], 6: [1] } })])

    expect(found.get(CHARACTER)?.has(5)).toBe(false)
    expect(found.get(CHARACTER)?.has(6)).toBe(true)
  })

  test("a character the game wrote no chapters for holds an empty map", () => {
    const held = knowing({ loreLibrary: { [MOTIFS]: { 7: [1, 5] } } })

    expect(compileKnownMotifsByStyleId([held]).get(CHARACTER)?.size).toBe(0)
  })

  test("no characters at all hold nothing", () => {
    expect(compileKnownMotifsByStyleId([])).toEqual(new Map())
  })
})

describe("A trait a character has yet to research is recorded as unknown.", () => {
  test("a trait one research line still wants is unknown for the whole craft", () => {
    const held = knowing({
      traitResearch: {
        1: {
          lines: {
            0: { traits: { 0: { name: "Divines", known: true } } },
            1: { traits: { 0: { name: "Divines", known: false } } },
          },
        },
      },
    })

    expect(compileResearchableTraits([held]).get(CHARACTER)?.get(1)?.get("divines")).toBe(false)
  })

  test("a trait every line has learned is known", () => {
    const held = knowing({
      traitResearch: {
        1: {
          lines: {
            0: { traits: { 0: { name: "Divines", known: true } } },
            1: { traits: { 0: { name: "Divines", known: true } } },
          },
        },
      },
    })

    expect(compileResearchableTraits([held]).get(CHARACTER)?.get(1)?.get("divines")).toBe(true)
  })

  test("a trait is held under its name in lower case", () => {
    const held = knowing({
      traitResearch: { 1: { lines: { 0: { traits: { 0: { name: "INFUSED", known: false } } } } } },
    })

    expect(compileResearchableTraits([held]).get(CHARACTER)?.get(1)?.has("infused")).toBe(true)
  })

  test("a character the game wrote no research for is left out", () => {
    expect(compileResearchableTraits([knowing({})]).has(CHARACTER)).toBe(false)
  })
})

describe("A script is recorded by the item id its name resolves to.", () => {
  test("a character with the scribing window open but nothing unlocked holds nothing", () => {
    expect(compileKnownScripts([knowing({ scribing: { scripts: {} } })]).get(CHARACTER)).toEqual(
      new Set()
    )
  })

  test("a script the game says is locked is left out", () => {
    const held = knowing({ scribing: { scripts: { "1": { name: "Empower", unlocked: false } } } })

    expect(compileKnownScripts([held]).get(CHARACTER)?.size).toBe(0)
  })

  test("a character the game wrote no scribing for is left out", () => {
    expect(compileKnownScripts([knowing({})]).has(CHARACTER)).toBe(false)
  })
})

describe("Bank stock is what the Bank location holds and nothing else.", () => {
  test("no inventory at all holds nothing", () => {
    expect(compileBankStock(null).size).toBe(0)
  })

  test("an inventory with no Bank holds nothing", () => {
    expect(compileBankStock(holding({ [CHARACTER]: { 1: { 0: stacked(100, 5) } } })).size).toBe(0)
  })

  test("the stacks of one item add up across every bank bag", () => {
    const found = compileBankStock(
      holding({
        Bank: {
          2: { 0: stacked(100, 30), 1: stacked(100, 70), 2: stacked(200, 5) },
          3: { 0: stacked(100, 100) },
        },
      })
    )

    expect(found.get(100)).toBe(200)
    expect(found.get(200)).toBe(5)
  })

  test("what a character carries is no part of the bank total", () => {
    const found = compileBankStock(
      holding({
        [CHARACTER]: { 1: { 0: stacked(100, 50) } },
        Bank: { 2: { 0: stacked(100, 10) } },
      })
    )

    expect(found.get(100)).toBe(10)
  })
})

describe("Only a location keyed by digits alone counts as a character for stock.", () => {
  test("wanting nothing holds nothing", () => {
    const inventory = holding({ [CHARACTER]: { 1: { 0: stacked(100, 50) } } })

    expect(compileConsumableStock(inventory, new Map()).size).toBe(0)
  })

  test("an item nothing wants is left out", () => {
    const inventory = holding({
      [CHARACTER]: { 1: { 0: stacked(100, 50), 1: stacked(999, 50) } },
    })
    const found = compileConsumableStock(inventory, new Map([[100, [CHARACTER]]]))

    expect(found.get(100)?.get(CHARACTER)).toBe(50)
    expect(found.has(999)).toBe(false)
  })

  test("the bank and a guild bank are no character", () => {
    const inventory = holding({
      [CHARACTER]: { 1: { 0: stacked(100, 30) } },
      Bank: { 2: { 0: stacked(100, 70) } },
      "Some Guild": { 4: { 0: stacked(100, 999) } },
    })
    const found = compileConsumableStock(inventory, new Map([[100, [CHARACTER]]]))

    expect(found.get(100)?.get(CHARACTER)).toBe(30)
    expect(found.get(100)?.has("Bank")).toBe(false)
    expect(found.get(100)?.has("Some Guild")).toBe(false)
  })

  test("the stacks one character carries add up across that character's bags", () => {
    const inventory = holding({
      [CHARACTER]: {
        0: { 0: stacked(100, 5) },
        1: { 0: stacked(100, 7), 1: stacked(100, 3) },
      },
    })
    const found = compileConsumableStock(inventory, new Map([[100, [CHARACTER]]]))

    expect(found.get(100)?.get(CHARACTER)).toBe(15)
  })
})
