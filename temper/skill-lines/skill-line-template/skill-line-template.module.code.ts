import type { SkillLineCategoryId } from "../skill-line-category-data/skill-line-category-data.module.code.ts"

export interface SkillLineTemplate {
  id: string
  name: string
  subcategoryId: SkillLineCategoryId | "none"
  class?: string
  displayOrder: number
  esoSkillLineId: number
  maxRank: number
}
