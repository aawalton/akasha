import type { CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import type { CompletionCharacterRow } from "./completion-character-row-type"
import { isCharacterMeasured } from "./completion-measured"
import type {
  CharacterTraitResearchProgress,
  TraitResearchCraftTypeProgress,
  TraitResearchLineEntry,
  TraitResearchTraitEntry,
} from "./completion-ui-types"
import { traitResearchData } from "./generated/trait-research-data.generated"

type TraitResearch = NonNullable<CharacterCompletion["traitResearch"]>
type ItemPath = readonly (string | number)[]

function traitKey(craftTypeId: number, lineIndex: number, traitName: string): string {
  return `${craftTypeId}:${lineIndex}:${traitName.toLowerCase()}`
}

function traitResearchKnownSet(traitResearch: TraitResearch | null | undefined): Set<string> {
  const knownSet = new Set<string>()
  if (!traitResearch) return knownSet

  for (const [craftKey, craftType] of Object.entries(traitResearch)) {
    const craftTypeId = Number(craftKey)
    for (const [lineKey, line] of Object.entries(craftType.lines)) {
      const lineIndex = Number(lineKey)
      for (const trait of Object.values(line.traits)) {
        if (trait.known) knownSet.add(traitKey(craftTypeId, lineIndex, trait.name))
      }
    }
  }

  return knownSet
}

function countTraitResearch(
  traitResearch: TraitResearch | null | undefined,
  itemPath?: ItemPath
): { current: number; total: number } {
  const knownSet = traitResearchKnownSet(traitResearch)
  const craftFilter = itemPath?.[0] !== undefined ? Number(itemPath[0]) : null
  const lineFilter = itemPath?.[1] !== undefined ? Number(itemPath[1]) : null
  const traitFilter = itemPath?.[2] !== undefined ? Number(itemPath[2]) : null

  let current = 0
  let total = 0
  for (const craft of traitResearchData) {
    if (craftFilter !== null && craft.craftTypeId !== craftFilter) continue
    for (const line of craft.lines) {
      if (lineFilter !== null && line.lineIndex !== lineFilter) continue
      for (const trait of line.traits) {
        if (traitFilter !== null && trait.traitIndex !== traitFilter) continue
        total++
        if (knownSet.has(traitKey(craft.craftTypeId, line.lineIndex, trait.name))) current++
      }
    }
  }
  return { current, total }
}

export function isTraitResearchCardComplete(completion: CharacterCompletion | null): boolean {
  if (!completion) return false
  const { current, total } = countTraitResearch(completion.traitResearch)
  return total > 0 && current === total
}

export function isTraitResearchItemComplete(
  completion: CharacterCompletion | null,
  itemPath: ItemPath
): boolean {
  if (!completion || itemPath.length === 0) return false
  const { current, total } = countTraitResearch(completion.traitResearch, itemPath)
  return total > 0 && current === total
}

function buildCraftTypes(knownSet: Set<string>): {
  craftTypes: readonly TraitResearchCraftTypeProgress[]
  knownCount: number
  totalCount: number
} {
  let totalKnown = 0
  let totalCount = 0

  const craftTypes = traitResearchData.map((craft) => {
    let craftKnown = 0
    let craftTotal = 0

    const lines: TraitResearchLineEntry[] = craft.lines.map((line) => {
      const traits: TraitResearchTraitEntry[] = line.traits.map((trait) => ({
        traitIndex: trait.traitIndex,
        name: trait.name,
        known: knownSet.has(traitKey(craft.craftTypeId, line.lineIndex, trait.name)),
      }))
      const lineKnown = traits.filter((t) => t.known).length
      craftKnown += lineKnown
      craftTotal += traits.length
      return {
        researchLineIndex: line.lineIndex,
        name: line.name,
        knownCount: lineKnown,
        totalCount: traits.length,
        traits,
      }
    })

    totalKnown += craftKnown
    totalCount += craftTotal
    return {
      craftingType: craft.craftTypeId,
      name: craft.name,
      lines,
      knownCount: craftKnown,
      totalCount: craftTotal,
    }
  })

  return { craftTypes, knownCount: totalKnown, totalCount }
}

export function transformTraitResearchProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterTraitResearchProgress[] {
  const result: CharacterTraitResearchProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!isCharacterMeasured(completion)) continue

    const { craftTypes, knownCount, totalCount } = buildCraftTypes(
      traitResearchKnownSet(completion?.traitResearch)
    )

    result.push({
      characterId: row.id,
      craftTypes,
      knownCount,
      totalCount,
    })
  }

  return result
}
