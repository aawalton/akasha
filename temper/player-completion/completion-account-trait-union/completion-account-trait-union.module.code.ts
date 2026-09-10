import type {
  CharacterTraitResearchProgress,
  TraitResearchCraftTypeProgress,
  TraitResearchLineEntry,
  TraitResearchTraitEntry,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export interface TraitResearchUnionCatalogTrait {
  traitIndex: number
  traitName: string
}

export interface TraitResearchUnionCatalogLine {
  slug: string
  title: string
  displayOrder: number
  parent: string
  traits: readonly TraitResearchUnionCatalogTrait[]
}

export interface TraitResearchUnionCatalogCraftType {
  slug: string
  title: string
  esoCraftTypeId: number
}

export interface AccountTraitResearchUnionProgress {
  craftTypes: readonly TraitResearchCraftTypeProgress[]
  knownCount: number
  totalCount: number
}

export function transformAccountTraitResearchUnion(
  traitResearchProgress: readonly CharacterTraitResearchProgress[],
  craftTypes: readonly TraitResearchUnionCatalogCraftType[],
  researchLines: readonly TraitResearchUnionCatalogLine[]
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

  const built: TraitResearchCraftTypeProgress[] = [...craftTypes]
    .sort((a, b) => a.esoCraftTypeId - b.esoCraftTypeId)
    .map((ct) => {
      let ctKnown = 0
      let ctTotal = 0

      const lines: TraitResearchLineEntry[] = researchLines
        .filter((line) => line.parent === ct.slug)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((line) => {
          let lineKnown = 0

          const traits: TraitResearchTraitEntry[] = line.traits.map((trait) => {
            const known = knownKeys.has(
              `${ct.esoCraftTypeId}|${line.displayOrder}|${trait.traitIndex}`
            )
            totalCount++
            ctTotal++
            if (known) {
              knownCount++
              ctKnown++
              lineKnown++
            }
            return { traitIndex: trait.traitIndex, name: trait.traitName, known }
          })

          return {
            researchLineIndex: line.displayOrder,
            name: line.title,
            knownCount: lineKnown,
            totalCount: traits.length,
            traits,
          }
        })

      return {
        craftingType: ct.esoCraftTypeId,
        name: ct.title,
        lines,
        knownCount: ctKnown,
        totalCount: ctTotal,
      }
    })

  return { craftTypes: built, knownCount, totalCount }
}
