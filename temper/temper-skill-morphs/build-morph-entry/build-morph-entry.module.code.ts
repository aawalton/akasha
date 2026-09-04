import type {
  MorphSuggestionEntry,
  SkillMorphInput,
} from "../select-morph-suggestions/select-morph-suggestions.module.code.ts"

export function buildMorphEntry(
  morphData: SkillMorphInput,
  isLineConflict: boolean,
  lineDisplayOrder: number,
  equippedSkillNames: ReadonlySet<string>
): MorphSuggestionEntry | undefined {
  const skillType: "active" | "ultimate" = morphData.isUltimate === true ? "ultimate" : "active"

  const baseRank = Math.min(morphData.base.rank ?? 0, 4)
  const morph1Rank = Math.min(morphData.morph1.rank ?? 0, 4)
  const morph2Rank = Math.min(morphData.morph2.rank ?? 0, 4)

  if (baseRank + morph1Rank + morph2Rank >= 12) return undefined

  if (baseRank < 4 || (morphData.currentMorph === 0 && morphData.atMorph === false)) {
    return makeEntry({
      skillName: morphData.base.name,
      skillType,
      variant: "base",
      rank: baseRank,
      lineDisplayOrder,
      abilityIndex: morphData.abilityIndex,
      isLineConflict,
      equippedSkillNames,
    })
  }

  let chosenName: string
  let unchosenName: string
  let chosenVariant: "morph1" | "morph2"
  let unchosenVariant: "morph1" | "morph2"
  let chosenRank: number
  let unchosenRank: number

  if (morphData.currentMorph > 0) {
    const chosen = morphData.currentMorph === 1 ? morphData.morph1 : morphData.morph2
    const unchosen = morphData.currentMorph === 1 ? morphData.morph2 : morphData.morph1
    chosenRank = Math.min(chosen.rank ?? 0, 4)
    unchosenRank = Math.min(unchosen.rank ?? 0, 4)
    chosenName = chosen.name
    unchosenName = unchosen.name
    chosenVariant = morphData.currentMorph === 1 ? "morph1" : "morph2"
    unchosenVariant = morphData.currentMorph === 1 ? "morph2" : "morph1"
  } else if (morph1Rank > 0 || morph2Rank > 0) {
    if (morph1Rank >= morph2Rank) {
      chosenRank = morph1Rank
      unchosenRank = morph2Rank
      chosenName = morphData.morph1.name
      unchosenName = morphData.morph2.name
      chosenVariant = "morph1"
      unchosenVariant = "morph2"
    } else {
      chosenRank = morph2Rank
      unchosenRank = morph1Rank
      chosenName = morphData.morph2.name
      unchosenName = morphData.morph1.name
      chosenVariant = "morph2"
      unchosenVariant = "morph1"
    }
  } else {
    return makeEntry({
      skillName: morphData.base.name,
      skillType,
      variant: "base",
      rank: 0,
      lineDisplayOrder,
      abilityIndex: morphData.abilityIndex,
      isLineConflict,
      equippedSkillNames,
    })
  }

  if (chosenRank < 4) {
    return makeEntry({
      skillName: chosenName,
      skillType,
      variant: chosenVariant,
      rank: chosenRank,
      lineDisplayOrder,
      abilityIndex: morphData.abilityIndex,
      isLineConflict,
      equippedSkillNames,
    })
  }
  if (unchosenRank < 4) {
    return makeEntry({
      skillName: unchosenName,
      skillType,
      variant: unchosenVariant,
      rank: unchosenRank,
      lineDisplayOrder,
      abilityIndex: morphData.abilityIndex,
      isLineConflict,
      equippedSkillNames,
    })
  }
  return undefined
}

interface MakeEntryArgs {
  skillName: string
  skillType: "active" | "ultimate"
  variant: "base" | "morph1" | "morph2"
  rank: number
  lineDisplayOrder: number
  abilityIndex: number
  isLineConflict: boolean
  equippedSkillNames: ReadonlySet<string>
}

function makeEntry(args: MakeEntryArgs): MorphSuggestionEntry {
  const isEquipped = args.equippedSkillNames.has(args.skillName)
  return {
    skillName: args.skillName,
    skillType: args.skillType,
    variant: args.variant,
    isEquipped,
    isLineConflict: args.isLineConflict,
    isIncompatible: isEquipped || args.isLineConflict,
    rank: args.rank,
    lineDisplayOrder: args.lineDisplayOrder,
    abilityIndex: args.abilityIndex,
  }
}
