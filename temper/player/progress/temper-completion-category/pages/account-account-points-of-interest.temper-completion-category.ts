import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountAccountPointsOfInterest = {
  id: "01a05fcb-e4b7-71b4-b571-06bfc997aa7f",
  type: "page-type/temper-completion-category",
  slug: "account-account-points-of-interest",
  title: "Points of Interest",
  nodeId: "account-points-of-interest",
  tab: "account",
  displayOrder: 12,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
