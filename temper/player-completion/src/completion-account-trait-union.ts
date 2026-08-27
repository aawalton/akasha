import type {
  CharacterTraitResearchProgress,
  TraitResearchCraftTypeProgress,
  TraitResearchLineEntry,
  TraitResearchTraitEntry,
} from "./completion-ui-types"
import { traitResearchData } from "./generated/trait-research-data.generated"

export interface AccountTraitResearchUnionProgress {
  craftTypes: readonly TraitResearchCraftTypeProgress[]
  knownCount: number
  totalCount: number
}

export function transformAccountTraitResearchUnion(
  traitResearchProgress: readonly CharacterTraitResearchProgress[]
): AccountTraitResearchUnionProgress {
  if (traitResearchProgress.length === 0) {
    return { craftTypes: [], knownCount: 0, totalCount: 0 }
  }

  const knownKeys = new Set<string>()
  for (const cp of traitResearchProgress) {
    for (const ct of cp.craftTypes) {
      for (const line of ct.lines) {
        for (const trait of line.traits) {
          if (trait.known) {
            knownKeys.add(`${ct.craftingType}|${line.researchLineIndex}|${trait.traitIndex}`)
          }
        }
      }
    }
  }

  let knownCount = 0
  let totalCount = 0

  const craftTypes: TraitResearchCraftTypeProgress[] = traitResearchData.map((ct) => {
    let ctKnown = 0
    let ctTotal = 0

    const lines: TraitResearchLineEntry[] = ct.lines.map((line) => {
      let lineKnown = 0

      const traits: TraitResearchTraitEntry[] = line.traits.map((trait) => {
        const known = knownKeys.has(`${ct.craftTypeId}|${line.lineIndex}|${trait.traitIndex}`)
        totalCount++
        ctTotal++
        if (known) {
          knownCount++
          ctKnown++
          lineKnown++
        }
        return { traitIndex: trait.traitIndex, name: trait.name, known }
      })

      return {
        researchLineIndex: line.lineIndex,
        name: line.name,
        knownCount: lineKnown,
        totalCount: traits.length,
        traits,
      }
    })

    return {
      craftingType: ct.craftTypeId,
      name: ct.name,
      lines,
      knownCount: ctKnown,
      totalCount: ctTotal,
    }
  })

  return { craftTypes, knownCount, totalCount }
}
