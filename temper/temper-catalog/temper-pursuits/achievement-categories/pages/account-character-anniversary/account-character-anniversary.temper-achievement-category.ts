import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCharacterAnniversary = {
  id: "01a06168-7247-7002-b6ab-69dce050c9ac",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-character-anniversary",
  title: "Anniversary",
  category: "account",
  displayOrder: 11,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
