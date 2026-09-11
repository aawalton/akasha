import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountNecromPrologue = {
  id: "01a06168-724e-7004-8af4-b0939930073e",
  type: "temper-achievement-category",
  slug: "account-necrom-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 5,
  parent: "account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
