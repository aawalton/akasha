import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountExplorationDaggerfallCovenant = {
  id: "01a06168-724b-7011-8290-888b15f66b5d",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-exploration-daggerfall-covenant",
  title: "Daggerfall Covenant",
  category: "account",
  displayOrder: 2,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
