import { describe, expect, test } from "bun:test"
import type { TraitResearchCraftType, TraitResearchLine, TraitResearchTrait } from "@temper/game-completion/completion-types"
import { mergeTraitResearch } from "./trait-research-merge"

function trait(name: string, known: boolean): TraitResearchTrait {
  return { name, known }
}

function line(name: string, traits: Record<number, TraitResearchTrait>): TraitResearchLine {
  return { name, traits }
}

function craft(name: string, lines: Record<number, TraitResearchLine>): TraitResearchCraftType {
  return { name, lines }
}

function fullCraft(name: string, lineCount: number): TraitResearchCraftType {
  const lines: Record<number, TraitResearchLine> = {}
  for (let lineIndex = 1; lineIndex <= lineCount; lineIndex++) {
    const traits: Record<number, TraitResearchTrait> = {}
    for (let traitIndex = 1; traitIndex <= 9; traitIndex++) {
      traits[traitIndex] = trait(`trait-${traitIndex}`, false)
    }
    lines[lineIndex] = line(`line-${lineIndex}`, traits)
  }
  return craft(name, lines)
}

function countTraits(research: Record<number, TraitResearchCraftType>): number {
  let total = 0
  for (const [, craftType] of Object.entries(research)) {
    for (const [, researchLine] of Object.entries(craftType.lines)) {
      total += Object.keys(researchLine.traits).length
    }
  }
  return total
}

describe("mergeTraitResearch", () => {
  test("an absent stored blob takes the fresh scan whole", () => {
    const fresh = { 1: fullCraft("Blacksmithing", 14) }
    expect(mergeTraitResearch(undefined, fresh)).toEqual(fresh)
  })

  test("a craft type only the fresh scan has is added", () => {
    const stored = { 1: fullCraft("Blacksmithing", 14) }
    const fresh = { 1: fullCraft("Blacksmithing", 14), 7: fullCraft("Jewelry Crafting", 2) }
    const merged = mergeTraitResearch(stored, fresh)
    expect(Object.keys(merged).length).toBe(2)
    expect(merged[7]?.name).toBe("Jewelry Crafting")
  })

  test("a craft type only the stored blob has is kept", () => {
    const stored = { 1: fullCraft("Blacksmithing", 14), 7: fullCraft("Jewelry Crafting", 2) }
    const fresh = { 1: fullCraft("Blacksmithing", 14) }
    const merged = mergeTraitResearch(stored, fresh)
    expect(Object.keys(merged).length).toBe(2)
    expect(countTraits(merged)).toBe(countTraits(stored))
  })

  test("lines the fresh scan adds to a known craft type are folded in", () => {
    const stored = { 1: craft("Blacksmithing", { 1: line("Axe", { 1: trait("Sturdy", false) }) }) }
    const fresh = {
      1: craft("Blacksmithing", {
        1: line("Axe", { 1: trait("Sturdy", false) }),
        2: line("Mace", { 1: trait("Sturdy", false) }),
      }),
    }
    const merged = mergeTraitResearch(stored, fresh)
    expect(Object.keys(merged[1]?.lines ?? {}).length).toBe(2)
    expect(merged[1]?.lines[2]?.name).toBe("Mace")
  })

  test("a line only the stored blob has is kept", () => {
    const stored = {
      1: craft("Blacksmithing", {
        1: line("Axe", { 1: trait("Sturdy", false) }),
        2: line("Mace", { 1: trait("Sturdy", false) }),
      }),
    }
    const fresh = { 1: craft("Blacksmithing", { 1: line("Axe", { 1: trait("Sturdy", false) }) }) }
    const merged = mergeTraitResearch(stored, fresh)
    expect(Object.keys(merged[1]?.lines ?? {}).length).toBe(2)
  })

  test("sparse stored line indices survive a merge that fills the holes", () => {
    const stored = {
      1: craft("Blacksmithing", {
        1: line("Axe", { 1: trait("Sturdy", false) }),
        4: line("Battle Axe", { 1: trait("Sturdy", false) }),
      }),
    }
    const fresh = {
      1: craft("Blacksmithing", {
        1: line("Axe", { 1: trait("Sturdy", false) }),
        2: line("Mace", { 1: trait("Sturdy", false) }),
        3: line("Sword", { 1: trait("Sturdy", false) }),
        4: line("Battle Axe", { 1: trait("Sturdy", false) }),
      }),
    }
    const merged = mergeTraitResearch(stored, fresh)
    expect(Object.keys(merged[1]?.lines ?? {}).length).toBe(4)
    expect(merged[1]?.lines[3]?.name).toBe("Sword")
  })

  test("a newly researched bit in the fresh scan lands", () => {
    const stored = { 1: craft("Blacksmithing", { 1: line("Axe", { 1: trait("Sturdy", false) }) }) }
    const fresh = { 1: craft("Blacksmithing", { 1: line("Axe", { 1: trait("Sturdy", true) }) }) }
    expect(mergeTraitResearch(stored, fresh)[1]?.lines[1]?.traits[1]?.known).toBe(true)
  })

  test("a cold scan reporting known=false never un-researches a known trait", () => {
    const stored = { 1: craft("Blacksmithing", { 1: line("Axe", { 1: trait("Sturdy", true) }) }) }
    const fresh = { 1: craft("Blacksmithing", { 1: line("Axe", { 1: trait("Sturdy", false) }) }) }
    expect(mergeTraitResearch(stored, fresh)[1]?.lines[1]?.traits[1]?.known).toBe(true)
  })

  test("a trait only the stored blob has is kept", () => {
    const stored = {
      1: craft("Blacksmithing", {
        1: line("Axe", { 1: trait("Sturdy", true), 2: trait("Impenetrable", true) }),
      }),
    }
    const fresh = { 1: craft("Blacksmithing", { 1: line("Axe", { 1: trait("Sturdy", true) }) }) }
    const merged = mergeTraitResearch(stored, fresh)
    expect(Object.keys(merged[1]?.lines[1]?.traits ?? {}).length).toBe(2)
    expect(merged[1]?.lines[1]?.traits[2]?.known).toBe(true)
  })

  test("an empty fresh name never overwrites a populated stored name", () => {
    const stored = { 1: craft("Blacksmithing", { 1: line("Axe", { 1: trait("Sturdy", false) }) }) }
    const fresh = { 1: craft("", { 1: line("", { 1: trait("", true) }) }) }
    const merged = mergeTraitResearch(stored, fresh)
    expect(merged[1]?.name).toBe("Blacksmithing")
    expect(merged[1]?.lines[1]?.name).toBe("Axe")
    expect(merged[1]?.lines[1]?.traits[1]?.name).toBe("Sturdy")
    expect(merged[1]?.lines[1]?.traits[1]?.known).toBe(true)
  })

  test("a sliver captured first heals to the full harvest on a later scan", () => {
    const partial = { 1: craft("Blacksmithing", { 1: line("Axe", { 1: trait("Sturdy", true) }) }) }
    const complete = {
      1: fullCraft("Blacksmithing", 14),
      2: fullCraft("Clothing", 14),
      6: fullCraft("Woodworking", 6),
      7: fullCraft("Jewelry Crafting", 2),
    }
    const merged = mergeTraitResearch(partial, complete)
    expect(Object.keys(merged).length).toBe(4)
    let lines = 0
    for (const [, craftType] of Object.entries(merged)) {
      lines += Object.keys(craftType.lines).length
    }
    expect(lines).toBe(36)
    expect(countTraits(merged)).toBe(324)
    expect(merged[1]?.lines[1]?.traits[1]?.known).toBe(true)
  })

  test("merging is idempotent — a repeat scan changes nothing", () => {
    const stored = {
      1: fullCraft("Blacksmithing", 14),
      7: fullCraft("Jewelry Crafting", 2),
    }
    expect(mergeTraitResearch(stored, stored)).toEqual(stored)
  })

  test("a legitimately empty craft type merges without inventing lines", () => {
    const stored = { 1: fullCraft("Blacksmithing", 14), 7: craft("Jewelry Crafting", {}) }
    const fresh = { 1: fullCraft("Blacksmithing", 14), 7: craft("Jewelry Crafting", {}) }
    const merged = mergeTraitResearch(stored, fresh)
    expect(Object.keys(merged[7]?.lines ?? {}).length).toBe(0)
    expect(merged[7]?.name).toBe("Jewelry Crafting")
  })
})
