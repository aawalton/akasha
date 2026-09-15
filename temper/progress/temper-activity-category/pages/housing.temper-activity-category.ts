import type { TemperActivityCategory } from "akasha/temper/progress/temper-activity-category/temper-activity-category.page-type.types.ts"

export const housing = {
  id: "01a05fc9-c60c-74ea-b6a7-f4df1262086a",
  type: "page-type/temper-activity-category",
  slug: "housing",
  title: "Housing",
  key: "housing",
  badgeVariant: "yellow",
} as const satisfies TemperActivityCategory
