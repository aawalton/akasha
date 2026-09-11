import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountNecromBastionNymic = {
  id: "01a06168-724e-7006-966e-91308e647985",
  type: "temper-achievement-category",
  slug: "account-necrom-bastion-nymic",
  title: "Bastion Nymic",
  category: "account",
  displayOrder: 7,
  parent: "account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
