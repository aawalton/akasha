import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountThievesGuildGeneral = {
  id: "01a06168-7251-7002-a2e7-6a171cea1827",
  type: "page-type/temper-achievement-category",
  slug: "account-thieves-guild-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-thieves-guild",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
