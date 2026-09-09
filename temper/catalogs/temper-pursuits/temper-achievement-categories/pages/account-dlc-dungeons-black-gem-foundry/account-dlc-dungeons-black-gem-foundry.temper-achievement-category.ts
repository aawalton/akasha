import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsBlackGemFoundry = {
  id: "01a06168-7249-7008-957f-36bf4f6bdb5e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-black-gem-foundry",
  title: "Black Gem Foundry",
  category: "account",
  displayOrder: 4,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
