import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountNecromQuests = {
  id: "01a06168-724e-7005-9cba-591362b0dfae",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-necrom-quests",
  title: "Quests",
  category: "account",
  displayOrder: 6,
  parent: "account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
