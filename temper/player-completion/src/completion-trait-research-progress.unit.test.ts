import { describe, expect, test } from "bun:test"
import type {
  CharacterCompletion,
  TraitResearchCraftType,
  TraitResearchLine,
  TraitResearchTrait,
} from "@temper/game-completion/completion-types"
import { CHARACTER_CRAFTING_CHECKERS } from "./character-crafting-checkers"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { transformTraitResearchProgress } from "./completion-trait-research-progress"
import { traitResearchData } from "./generated/trait-research-data.generated"

const TOTAL_TRAITS = traitResearchData.reduce(
  (s, c) => s + c.lines.reduce((a, l) => a + l.traits.length, 0),
  0
)

const checker = CHARACTER_CRAFTING_CHECKERS["trait-research"]
if (checker === undefined) throw new Error("fixture: trait-research checker missing")
const { isCardComplete } = checker
const isItemComplete = checker.isItemComplete
if (isItemComplete === undefined) throw new Error("fixture: trait-research isItemComplete missing")

const ROSTER_STUB: CharacterCompletion = {
  gender: 1,
  level: 27,
  classId: 3,
  allianceId: 2,
  raceId: 5,
  className: "Sorcerer",
  classIcon: "/esoui/art/class/sorcerer.dds",
}

function row(id: string, completion: CharacterCompletion | null): CompletionCharacterRow {
  return {
    id,
    userId: "user-1",
    esoCharacterId: `eso-${id}`,
    completion,
    createdAt: 0,
    updatedAt: 0,
    roles: [],
  }
}

function wire(opts: {
  craftTypeIds?: readonly number[]
  known?: (craftTypeId: number, lineIndex: number, traitIndex: number) => boolean
}): Record<number, TraitResearchCraftType> {
  const out: Record<number, TraitResearchCraftType> = {}
  for (const craft of traitResearchData) {
    if (opts.craftTypeIds !== undefined && !opts.craftTypeIds.includes(craft.craftTypeId)) continue
    const lines: Record<number, TraitResearchLine> = {}
    for (const line of craft.lines) {
      const traits: Record<number, TraitResearchTrait> = {}
      for (const trait of line.traits) {
        traits[trait.traitIndex] = {
          name: trait.name,
          known: opts.known?.(craft.craftTypeId, line.lineIndex, trait.traitIndex) ?? false,
        }
      }
      lines[line.lineIndex] = { name: line.name, traits }
    }
    out[craft.craftTypeId] = { name: craft.name, lines }
  }
  return out
}

const FIRST_CRAFT = traitResearchData[0]
if (FIRST_CRAFT === undefined) throw new Error("fixture: traitResearchData[0] missing")
const FIRST_LINE = FIRST_CRAFT.lines[0]
if (FIRST_LINE === undefined) throw new Error("fixture: traitResearchData[0].lines[0] missing")

describe("transformTraitResearchProgress — static denominator", () => {
  test("the static universe is 4 craft types / 36 lines / 324 traits", () => {
    expect(traitResearchData.length).toBe(4)
    expect(traitResearchData.reduce((s, c) => s + c.lines.length, 0)).toBe(36)
    expect(TOTAL_TRAITS).toBe(324)
  })

  test("a character carrying ONLY craft type 1 still scores against 324", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_STUB,
      traitResearch: wire({
        craftTypeIds: [FIRST_CRAFT.craftTypeId],
        known: (_c, lineIndex) => lineIndex === FIRST_LINE.lineIndex,
      }),
    }
    const [progress] = transformTraitResearchProgress([row("c1", completion)])
    if (progress === undefined) throw new Error("expected the character to be emitted")

    expect(progress.totalCount).toBe(TOTAL_TRAITS)
    expect(progress.knownCount).toBe(FIRST_LINE.traits.length)
    expect(progress.craftTypes.map((c) => c.craftingType)).toEqual(
      traitResearchData.map((c) => c.craftTypeId)
    )
    expect(isCardComplete(completion)).toBe(false)
  })

  test("every emitted craft type / line carries its full static subtotal", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_STUB,
      traitResearch: wire({ craftTypeIds: [FIRST_CRAFT.craftTypeId] }),
    }
    const [progress] = transformTraitResearchProgress([row("c1", completion)])
    if (progress === undefined) throw new Error("expected the character to be emitted")

    for (const staticCraft of traitResearchData) {
      const craft = progress.craftTypes.find((c) => c.craftingType === staticCraft.craftTypeId)
      if (craft === undefined) throw new Error(`craft type ${staticCraft.craftTypeId} not emitted`)
      const subtotal = staticCraft.lines.reduce((a, l) => a + l.traits.length, 0)
      expect(craft.totalCount).toBe(subtotal)
      expect(craft.lines.map((l) => l.researchLineIndex)).toEqual(
        staticCraft.lines.map((l) => l.lineIndex)
      )
      for (const staticLine of staticCraft.lines) {
        const line = craft.lines.find((l) => l.researchLineIndex === staticLine.lineIndex)
        if (line === undefined) throw new Error(`line ${staticLine.lineIndex} not emitted`)
        expect(line.totalCount).toBe(staticLine.traits.length)
        expect(line.traits.map((t) => t.traitIndex)).toEqual(
          staticLine.traits.map((t) => t.traitIndex)
        )
      }
    }
  })

  test("a measured character with NO traitResearch key is emitted at 0/324", () => {
    const completion: CharacterCompletion = { ...ROSTER_STUB, quests: [] }
    const [progress] = transformTraitResearchProgress([row("c1", completion)])
    if (progress === undefined) throw new Error("expected the measured character to be emitted")

    expect(progress.knownCount).toBe(0)
    expect(progress.totalCount).toBe(TOTAL_TRAITS)
    expect(isCardComplete(completion)).toBe(false)
  })

  test("a roster-identity-only character is NOT emitted at all", () => {
    expect(transformTraitResearchProgress([row("c1", ROSTER_STUB)])).toEqual([])
  })

  test("a null / absent completion blob is NOT emitted", () => {
    expect(transformTraitResearchProgress([row("c1", null)])).toEqual([])
    expect(transformTraitResearchProgress([row("c1", {})])).toEqual([])
  })

  test("a fully-known character is 324/324 and complete", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_STUB,
      traitResearch: wire({ known: () => true }),
    }
    const [progress] = transformTraitResearchProgress([row("c1", completion)])
    if (progress === undefined) throw new Error("expected the character to be emitted")

    expect(progress.knownCount).toBe(TOTAL_TRAITS)
    expect(progress.totalCount).toBe(TOTAL_TRAITS)
    expect(isCardComplete(completion)).toBe(true)
  })

  test("trait known status matches the wire case-insensitively", () => {
    const blob = wire({ craftTypeIds: [FIRST_CRAFT.craftTypeId], known: () => true })
    const craft = blob[FIRST_CRAFT.craftTypeId]
    if (craft === undefined) throw new Error("fixture: craft type missing from wire")
    const line = craft.lines[FIRST_LINE.lineIndex]
    if (line === undefined) throw new Error("fixture: line missing from wire")
    for (const [idx, trait] of Object.entries(line.traits)) {
      line.traits[Number(idx)] = { ...trait, name: trait.name.toUpperCase() }
    }

    const [progress] = transformTraitResearchProgress([
      row("c1", { ...ROSTER_STUB, traitResearch: blob }),
    ])
    if (progress === undefined) throw new Error("expected the character to be emitted")
    const outCraft = progress.craftTypes.find((c) => c.craftingType === FIRST_CRAFT.craftTypeId)
    const outLine = outCraft?.lines.find((l) => l.researchLineIndex === FIRST_LINE.lineIndex)
    if (outLine === undefined) throw new Error("expected the line to be emitted")
    expect(outLine.knownCount).toBe(FIRST_LINE.traits.length)
    expect(outLine.traits.map((t) => t.name)).toEqual(FIRST_LINE.traits.map((t) => t.name))
  })
})

describe("trait-research isCardComplete — no vacuous truth", () => {
  test("a null / empty completion is NOT complete", () => {
    expect(isCardComplete(null)).toBe(false)
    expect(isCardComplete({})).toBe(false)
  })

  test("an empty traitResearch map is NOT complete", () => {
    expect(isCardComplete({ ...ROSTER_STUB, traitResearch: {} })).toBe(false)
  })

  test("a craft type present with `lines: {}` is NOT complete", () => {
    const traitResearch: Record<number, TraitResearchCraftType> = {}
    for (const craft of traitResearchData) {
      traitResearch[craft.craftTypeId] = { name: craft.name, lines: {} }
    }
    expect(isCardComplete({ ...ROSTER_STUB, traitResearch })).toBe(false)
  })

  test("a line present with `traits: {}` is NOT complete", () => {
    const traitResearch = wire({ known: () => true })
    const craft = traitResearch[FIRST_CRAFT.craftTypeId]
    if (craft === undefined) throw new Error("fixture: craft type missing from wire")
    craft.lines[FIRST_LINE.lineIndex] = { name: FIRST_LINE.name, traits: {} }
    expect(isCardComplete({ ...ROSTER_STUB, traitResearch })).toBe(false)
  })

  test("all traits known but one craft type absent from the wire is NOT complete", () => {
    const traitResearch = wire({
      craftTypeIds: traitResearchData.slice(1).map((c) => c.craftTypeId),
      known: () => true,
    })
    expect(isCardComplete({ ...ROSTER_STUB, traitResearch })).toBe(false)
  })
})

describe("trait-research isItemComplete — no vacuous truth", () => {
  test("an empty path is not an item", () => {
    expect(isItemComplete({ ...ROSTER_STUB, traitResearch: wire({ known: () => true }) }, [])).toBe(
      false
    )
  })

  test("a craft type with `lines: {}` is NOT complete at the craft-type level", () => {
    const traitResearch: Record<number, TraitResearchCraftType> = {
      [FIRST_CRAFT.craftTypeId]: { name: FIRST_CRAFT.name, lines: {} },
    }
    expect(isItemComplete({ ...ROSTER_STUB, traitResearch }, [FIRST_CRAFT.craftTypeId])).toBe(false)
  })

  test("a line with `traits: {}` is NOT complete at the line level", () => {
    const traitResearch: Record<number, TraitResearchCraftType> = {
      [FIRST_CRAFT.craftTypeId]: {
        name: FIRST_CRAFT.name,
        lines: { [FIRST_LINE.lineIndex]: { name: FIRST_LINE.name, traits: {} } },
      },
    }
    expect(
      isItemComplete({ ...ROSTER_STUB, traitResearch }, [
        FIRST_CRAFT.craftTypeId,
        FIRST_LINE.lineIndex,
      ])
    ).toBe(false)
  })

  test("an absent craft type / line / trait is NOT complete at every level", () => {
    const completion: CharacterCompletion = { ...ROSTER_STUB, traitResearch: {} }
    expect(isItemComplete(completion, [FIRST_CRAFT.craftTypeId])).toBe(false)
    expect(isItemComplete(completion, [FIRST_CRAFT.craftTypeId, FIRST_LINE.lineIndex])).toBe(false)
    const trait = FIRST_LINE.traits[0]
    if (trait === undefined) throw new Error("fixture: first trait missing")
    expect(
      isItemComplete(completion, [FIRST_CRAFT.craftTypeId, FIRST_LINE.lineIndex, trait.traitIndex])
    ).toBe(false)
  })

  test("a fully-known wire is complete at craft-type, line, and trait level", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_STUB,
      traitResearch: wire({ known: () => true }),
    }
    const trait = FIRST_LINE.traits[0]
    if (trait === undefined) throw new Error("fixture: first trait missing")
    expect(isItemComplete(completion, [FIRST_CRAFT.craftTypeId])).toBe(true)
    expect(isItemComplete(completion, [FIRST_CRAFT.craftTypeId, FIRST_LINE.lineIndex])).toBe(true)
    expect(
      isItemComplete(completion, [FIRST_CRAFT.craftTypeId, FIRST_LINE.lineIndex, trait.traitIndex])
    ).toBe(true)
  })

  test("one unknown trait falsifies its line and its craft type", () => {
    const trait = FIRST_LINE.traits[0]
    if (trait === undefined) throw new Error("fixture: first trait missing")
    const completion: CharacterCompletion = {
      ...ROSTER_STUB,
      traitResearch: wire({
        known: (c, l, t) =>
          !(c === FIRST_CRAFT.craftTypeId && l === FIRST_LINE.lineIndex && t === trait.traitIndex),
      }),
    }
    expect(
      isItemComplete(completion, [FIRST_CRAFT.craftTypeId, FIRST_LINE.lineIndex, trait.traitIndex])
    ).toBe(false)
    expect(isItemComplete(completion, [FIRST_CRAFT.craftTypeId, FIRST_LINE.lineIndex])).toBe(false)
    expect(isItemComplete(completion, [FIRST_CRAFT.craftTypeId])).toBe(false)
    expect(isCardComplete(completion)).toBe(false)
  })

  test("an unknown craft type id is not complete", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_STUB,
      traitResearch: wire({ known: () => true }),
    }
    expect(isItemComplete(completion, [999])).toBe(false)
    expect(isItemComplete(completion, [FIRST_CRAFT.craftTypeId, 999])).toBe(false)
    expect(isItemComplete(completion, [FIRST_CRAFT.craftTypeId, FIRST_LINE.lineIndex, 999])).toBe(
      false
    )
  })
})

describe("trait-research predicate agrees with displayed progress", () => {
  test("isCardComplete is true exactly when the transform shows 324/324", () => {
    const cases: readonly CharacterCompletion[] = [
      { ...ROSTER_STUB, quests: [] },
      { ...ROSTER_STUB, traitResearch: {} },
      { ...ROSTER_STUB, traitResearch: wire({ craftTypeIds: [FIRST_CRAFT.craftTypeId] }) },
      {
        ...ROSTER_STUB,
        traitResearch: wire({ craftTypeIds: [FIRST_CRAFT.craftTypeId], known: () => true }),
      },
      { ...ROSTER_STUB, traitResearch: wire({ known: () => true }) },
    ]

    for (const completion of cases) {
      const [progress] = transformTraitResearchProgress([row("c1", completion)])
      if (progress === undefined) throw new Error("expected the character to be emitted")
      expect(isCardComplete(completion)).toBe(progress.knownCount === progress.totalCount)
    }
  })
})
