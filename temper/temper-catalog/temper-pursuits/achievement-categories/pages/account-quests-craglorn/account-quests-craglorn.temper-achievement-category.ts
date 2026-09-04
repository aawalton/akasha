import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountQuestsCraglorn = {
  id: "01a06168-724c-7009-b59d-92ef39b25071",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-quests-craglorn",
  title: "Craglorn",
  category: "account",
  displayOrder: 6,
  parent: "account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
