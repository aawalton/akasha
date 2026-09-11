import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterDragonholdGeneral = {
  id: "01a06168-7252-700b-ae72-f504c2001c25",
  pageTypeSlug: "temper-achievement-category",
  type: "temper-achievement-category",
  slug: "character-dragonhold-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "character-dragonhold",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
