export interface SkillCatalogMorph {
  abilityId: number
  name: string
  description: string
  icon: string
}

export interface SkillCatalogAbility {
  baseName: string
  isPassive: boolean
  isUltimate: boolean
  lineRankNeeded: number
  learnedLevel: number
  morphs?: Record<number, SkillCatalogMorph>
  abilityId?: number
  name?: string
  description?: string
  icon?: string
}

export interface SkillCatalogLine {
  name: string
  skillType: number
  lineIndex: number
  orderingIndex: number
  maxRank: number
  excludeFromCompletion: boolean
  abilities: Record<number, SkillCatalogAbility>
}
