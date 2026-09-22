import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersPointsOfInterest = {
  id: "01a05fcb-e4c1-7f57-ac6a-656acff6408c",
  type: "page-type/temper-completion-category",
  slug: "characters-points-of-interest",
  title: "Points of Interest",
  nodeId: "points-of-interest",
  tab: "characters",
  displayOrder: 12,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
