import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsLairOfMaarselok = {
  id: "01a06168-724a-7000-9772-cab6397eb9f8",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-lair-of-maarselok",
  title: "Lair of Maarselok",
  category: "account",
  displayOrder: 19,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
