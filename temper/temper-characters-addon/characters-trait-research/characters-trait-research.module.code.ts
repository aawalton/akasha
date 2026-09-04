import type {
  TraitResearchCraftType,
  TraitResearchLine,
  TraitResearchTrait,
} from "@akasha/temper-completion/completion-progress"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"
import { mergeTraitResearch } from "../characters-trait-research-merge/characters-trait-research-merge.module.code.ts"

export const CRAFTING_TYPES = [
  CRAFTING_TYPE_BLACKSMITHING,
  CRAFTING_TYPE_CLOTHIER,
  CRAFTING_TYPE_WOODWORKING,
  CRAFTING_TYPE_JEWELRYCRAFTING,
]

function readTrait(
  craftingType: number,
  lineIndex: number,
  traitIndex: number
): TraitResearchTrait {
  const [traitType, , known] = GetSmithingResearchLineTraitInfo(craftingType, lineIndex, traitIndex)
  return { name: GetString("SI_ITEMTRAITTYPE", traitType), known }
}

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
        traits[traitIndex] = readTrait(craftingType, lineIndex, traitIndex)
      }

      lines[lineIndex] = { name: zo_strformat("<<1>>", lineName), traits }
    }

    result[craftingType] = { name: craftName, lines }
  }

  return result
}

export function collectTraitResearch(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.traitResearch = mergeTraitResearch(charEntry.traitResearch, scanTraitResearch())
}

export function updateTraitResearch(
  craftingSkillType: number,
  researchLineIndex: number,
  traitIndex: number
): undefined {
  const traitResearch = currentCharacterEntry()?.traitResearch
  if (traitResearch === undefined) return

  const line = traitResearch[craftingSkillType]?.lines[researchLineIndex]
  if (line === undefined) return

  line.traits[traitIndex] = readTrait(craftingSkillType, researchLineIndex, traitIndex)
}

export function refreshAllTraitResearch(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.traitResearch = scanTraitResearch()
}
