import { skillLineCategories } from "./generated/temper-skill-line-category.generated"

export { skillLineCategories } from "./generated/temper-skill-line-category.generated"

export interface SkillLineCategoryTemplate {
  id: string
  name: string
  displayOrder: number
}

export type SkillLineCategoryId = (typeof skillLineCategories.ids)[number]

export const skillLineCategoriesSorted = [...skillLineCategories.list].sort(
  (a, b) => a.displayOrder - b.displayOrder
)
