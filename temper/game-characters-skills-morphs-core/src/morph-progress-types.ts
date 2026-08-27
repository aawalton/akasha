import type { SkillLineId } from "@temper/game-characters-skill-lines/skill-lines-data"

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
