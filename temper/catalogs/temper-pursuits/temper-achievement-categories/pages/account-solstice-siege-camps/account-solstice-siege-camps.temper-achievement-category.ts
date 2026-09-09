import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountSolsticeSiegeCamps = {
  id: "01a06168-724d-700f-ba08-526d1c26529e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-solstice-siege-camps",
  title: "Siege Camps",
  category: "account",
  displayOrder: 5,
  parent: "account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
