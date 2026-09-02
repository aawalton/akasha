import type { TraitResearchCraftType, TraitResearchLine, TraitResearchTrait } from "@akasha/temper-completion/completion-progress"
import { getSavedVariables } from "../saved-variables"
import { mergeTraitResearch } from "./trait-research-merge"
export const CRAFTING_TYPES = [
  CRAFTING_TYPE_BLACKSMITHING,
  CRAFTING_TYPE_CLOTHIER,
  CRAFTING_TYPE_WOODWORKING,
  CRAFTING_TYPE_JEWELRYCRAFTING,
]

export function scanTraitResearch(): Record<number, TraitResearchCraftType> {
  const result: Record<number, TraitResearchCraftType> = {}

  for (const craftingType of CRAFTING_TYPES) {
    const craftName = zo_strformat("<<1>>", GetCraftingSkillName(craftingType))
    const numLines = GetNumSmithingResearchLines(craftingType)
    const lines: Record<number, TraitResearchLine> = {}

    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const [lineName, , numTraits] = GetSmithingResearchLineInfo(craftingType, lineIndex)
      if (lineName === undefined || lineName === "") continue

      const traits: Record<number, TraitResearchTrait> = {}

      for (let traitIndex = 1; traitIndex <= numTraits; traitIndex++) {
        const [traitType, , known] = GetSmithingResearchLineTraitInfo(
          craftingType,
          lineIndex,
          traitIndex
        )
        traits[traitIndex] = { name: GetString("SI_ITEMTRAITTYPE", traitType), known }
      }

      lines[lineIndex] = { name: zo_strformat("<<1>>", lineName), traits }
    }

    result[craftingType] = { name: craftName, lines }
  }

  return result
}

export function collectTraitResearch(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  charEntry.traitResearch = mergeTraitResearch(charEntry.traitResearch, scanTraitResearch())
}

export function updateTraitResearch(
  craftingSkillType: number,
  researchLineIndex: number,
  traitIndex: number
): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  const traitResearch = charEntry.traitResearch
  if (traitResearch === undefined) return

  const craftType = traitResearch[craftingSkillType]
  if (craftType === undefined) return

  const line = craftType.lines[researchLineIndex]
  if (line === undefined) return

  const [traitType, , known] = GetSmithingResearchLineTraitInfo(
    craftingSkillType,
    researchLineIndex,
    traitIndex
  )
  line.traits[traitIndex] = { name: GetString("SI_ITEMTRAITTYPE", traitType), known }
}

export function refreshAllTraitResearch(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  charEntry.traitResearch = scanTraitResearch()
}
