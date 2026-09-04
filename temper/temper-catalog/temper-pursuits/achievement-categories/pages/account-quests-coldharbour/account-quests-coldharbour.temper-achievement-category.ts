import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountQuestsColdharbour = {
  id: "01a06168-724c-7008-9356-695edfd578de",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-quests-coldharbour",
  title: "Coldharbour",
  category: "account",
  displayOrder: 5,
  parent: "account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
