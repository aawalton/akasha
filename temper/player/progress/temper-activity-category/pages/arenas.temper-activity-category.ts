import type { TemperActivityCategory } from "akasha/temper/player/progress/temper-activity-category/temper-activity-category.page-type.types.ts"

export const arenas = {
  id: "01a05fc9-c609-786b-ad26-97a4a558dc90",
  type: "page-type/temper-activity-category",
  slug: "arenas",
  title: "Arenas",
  key: "arenas",
  badgeVariant: "orange",
  displayOrder: 1,
} as const satisfies TemperActivityCategory
