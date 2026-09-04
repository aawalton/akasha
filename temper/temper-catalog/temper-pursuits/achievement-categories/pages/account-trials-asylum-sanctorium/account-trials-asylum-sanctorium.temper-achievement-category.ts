import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountTrialsAsylumSanctorium = {
  id: "01a06168-724a-7013-97a1-401febac7a4d",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-trials-asylum-sanctorium",
  title: "Asylum Sanctorium",
  category: "account",
  displayOrder: 2,
  parent: "account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
