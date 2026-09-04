import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountQuestsEbonheartPact = {
  id: "01a06168-724c-7007-a18a-5a8bfce2e7e9",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-quests-ebonheart-pact",
  title: "Ebonheart Pact",
  category: "account",
  displayOrder: 4,
  parent: "account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
