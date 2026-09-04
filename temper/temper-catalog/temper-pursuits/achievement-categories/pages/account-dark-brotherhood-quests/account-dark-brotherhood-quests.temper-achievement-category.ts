import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDarkBrotherhoodQuests = {
  id: "01a06168-7251-7000-8800-b2f3f41ab23f",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dark-brotherhood-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "account-dark-brotherhood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
