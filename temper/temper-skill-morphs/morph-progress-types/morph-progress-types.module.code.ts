import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"

export interface MorphableSkillDetail {
  abilityIndex: number
  baseName: string
  baseRank: number
  morph1Name: string
  morph1Rank: number
  morph2Name: string
  morph2Rank: number
  skillType: "active" | "ultimate"
}

export interface SkillMorphProgressEntry {
  skillLineId: SkillLineId
  skills: readonly MorphableSkillDetail[]
}

export interface CharacterSkillMorphProgress {
  characterId: string
  entries: readonly SkillMorphProgressEntry[]
}
