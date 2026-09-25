import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { transformTraitResearchProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-trait-research-progress/completion-trait-research-progress.module.code.ts"
import {
  AXE,
  BLACKSMITHING,
  CATALOG_CRAFT_TYPES,
  CATALOG_RESEARCH_LINES,
  capturedTraitResearch,
  characterRow,
  linesUnderCraft,
  ROSTER_ONLY,
  TOTAL_CATALOG_TRAITS,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-trait-research-progress/completion-trait-research-progress.module.test-fixtures.ts"

const CRAFTS = CATALOG_CRAFT_TYPES
const LINES = CATALOG_RESEARCH_LINES

function progressOf(completion: CharacterCompletion | null) {
  const [progress] = transformTraitResearchProgress([characterRow("c1", completion)], CRAFTS, LINES)
  if (progress === undefined) throw new Error("expected the character to be emitted")
  return progress
}

describe("transformTraitResearchProgress — the denominator is the catalog handed in", () => {
  test("the catalog under test is 4 craft types, 6 research lines and 54 traits", () => {
    expect(CRAFTS.length).toBe(4)
    expect(LINES.length).toBe(6)
    expect(TOTAL_CATALOG_TRAITS).toBe(54)
  })

  test("a character carrying only the first craft type still scores against the whole catalog", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({
        craftTypeIds: [BLACKSMITHING.esoCraftTypeId],
        known: (_craft, lineIndex) => lineIndex === AXE.displayOrder,
      }),
    }
    const progress = progressOf(completion)

    expect(progress.totalCount).toBe(TOTAL_CATALOG_TRAITS)
    expect(progress.knownCount).toBe(AXE.traits.length)
    expect(progress.craftTypes.map((craft) => craft.craftingType)).toEqual(
      CRAFTS.map((craft) => craft.esoCraftTypeId)
    )
  })

  test("every emitted craft type and line carries its whole catalog subtotal", () => {
    const progress = progressOf({
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({ craftTypeIds: [BLACKSMITHING.esoCraftTypeId] }),
    })

    for (const catalogCraft of CRAFTS) {
      const craft = progress.craftTypes.find((c) => c.craftingType === catalogCraft.esoCraftTypeId)
      if (craft === undefined)
        throw new Error(`craft type ${catalogCraft.esoCraftTypeId} is absent`)
      const catalogLines = linesUnderCraft(catalogCraft.slug)
      expect(craft.name).toBe(catalogCraft.title)
      expect(craft.totalCount).toBe(catalogLines.reduce((sum, l) => sum + l.traits.length, 0))
      expect(craft.lines.map((line) => line.researchLineIndex)).toEqual(
        catalogLines.map((line) => line.displayOrder)
      )
      for (const catalogLine of catalogLines) {
        const line = craft.lines.find((l) => l.researchLineIndex === catalogLine.displayOrder)
        if (line === undefined) throw new Error(`line ${catalogLine.displayOrder} is absent`)
        expect(line.name).toBe(catalogLine.title)
        expect(line.totalCount).toBe(catalogLine.traits.length)
        expect(line.traits.map((trait) => trait.traitIndex)).toEqual(
          catalogLine.traits.map((trait) => trait.traitIndex)
        )
      }
    }
  })

  test("a read character with no traitResearch key is emitted at nothing out of the whole", () => {
    const completion: CharacterCompletion = { ...ROSTER_ONLY, quests: [] }
    const progress = progressOf(completion)

    expect(progress.knownCount).toBe(0)
    expect(progress.totalCount).toBe(TOTAL_CATALOG_TRAITS)
  })

  test("a character carrying only roster fields is not emitted at all", () => {
    expect(
      transformTraitResearchProgress([characterRow("c1", ROSTER_ONLY)], CRAFTS, LINES)
    ).toEqual([])
  })

  test("a null or absent completion is not emitted", () => {
    expect(transformTraitResearchProgress([characterRow("c1", null)], CRAFTS, LINES)).toEqual([])
    expect(transformTraitResearchProgress([characterRow("c1", {})], CRAFTS, LINES)).toEqual([])
  })

  test("a character knowing every trait is the whole catalog over itself", () => {
    const completion: CharacterCompletion = {
      ...ROSTER_ONLY,
      traitResearch: capturedTraitResearch({ known: () => true }),
    }
    const progress = progressOf(completion)

    expect(progress.knownCount).toBe(TOTAL_CATALOG_TRAITS)
    expect(progress.totalCount).toBe(TOTAL_CATALOG_TRAITS)
  })

  test("a trait is matched to what the game reported without regard to letter case", () => {
    const reported = capturedTraitResearch({
      craftTypeIds: [BLACKSMITHING.esoCraftTypeId],
      known: () => true,
    })
    const craft = reported[BLACKSMITHING.esoCraftTypeId]
    if (craft === undefined) throw new Error("the craft type is absent from what was reported")
    const line = craft.lines[AXE.displayOrder]
    if (line === undefined) throw new Error("the line is absent from what was reported")
    for (const [index, trait] of Object.entries(line.traits)) {
      line.traits[Number(index)] = { ...trait, name: trait.name.toUpperCase() }
    }

    const progress = progressOf({ ...ROSTER_ONLY, traitResearch: reported })
    const outCraft = progress.craftTypes.find(
      (c) => c.craftingType === BLACKSMITHING.esoCraftTypeId
    )
    const outLine = outCraft?.lines.find((l) => l.researchLineIndex === AXE.displayOrder)
    if (outLine === undefined) throw new Error("expected the line to be emitted")
    expect(outLine.knownCount).toBe(AXE.traits.length)
    expect(outLine.traits.map((trait) => trait.name)).toEqual(
      AXE.traits.map((trait) => trait.traitName)
    )
  })
})

describe("transformTraitResearchProgress — the order the catalog is read in", () => {
  test("craft types come back by the game number however the catalog is ordered", () => {
    const [progress] = transformTraitResearchProgress(
      [characterRow("c1", { ...ROSTER_ONLY, quests: [] })],
      [...CRAFTS].reverse(),
      LINES
    )
    if (progress === undefined) throw new Error("expected the character to be emitted")

    expect(progress.craftTypes.map((craft) => craft.craftingType)).toEqual([1, 2, 6, 7])
  })

  test("research lines come back by display order however the catalog is ordered", () => {
    const [progress] = transformTraitResearchProgress(
      [characterRow("c1", { ...ROSTER_ONLY, quests: [] })],
      CRAFTS,
      [...LINES].reverse()
    )
    if (progress === undefined) throw new Error("expected the character to be emitted")
    const jewelry = progress.craftTypes.find((craft) => craft.craftingType === 7)

    expect(jewelry?.lines.map((line) => line.researchLineIndex)).toEqual([1, 2])
    expect(jewelry?.lines.map((line) => line.name)).toEqual(["Ring", "Necklace"])
  })

  test("a research line hangs beneath the craft type its parent names", () => {
    const progress = progressOf({ ...ROSTER_ONLY, quests: [] })

    expect(
      progress.craftTypes.map((craft) => [craft.craftingType, craft.lines.map((l) => l.name)])
    ).toEqual([
      [1, ["Axe", "Mace"]],
      [2, ["Robe & Jerkin"]],
      [6, ["Bow"]],
      [7, ["Ring", "Necklace"]],
    ])
  })
})
