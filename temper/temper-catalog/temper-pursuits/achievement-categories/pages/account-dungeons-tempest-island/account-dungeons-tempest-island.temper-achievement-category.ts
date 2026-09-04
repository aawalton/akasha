import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDungeonsTempestIsland = {
  id: "01a06168-7248-7015-8da4-dee3ee647a45",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dungeons-tempest-island",
  title: "Tempest Island",
  category: "account",
  displayOrder: 20,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
