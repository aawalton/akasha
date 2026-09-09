import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountGreymoorHarrowstorms = {
  id: "01a06168-724f-7003-a927-da6ddb988408",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-greymoor-harrowstorms",
  title: "Harrowstorms",
  category: "account",
  displayOrder: 5,
  parent: "account-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
