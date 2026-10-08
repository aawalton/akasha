import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountChampionPoints = {
  id: "01a05fcb-e4bb-7cd6-87a7-5652c99270e5",
  type: "page-type/temper-completion-category",
  slug: "account-champion-points",
  title: "Champion Points",
  nodeId: "champion-points",
  tab: "account",
  displayOrder: 5,
  parent: "temper-completion-category/account",
  completionMost: 3600,
  createdAt: "2026-09-02T01:46:33.019Z",
  updatedAt: "2026-09-27T05:30:31.000Z",
} as const satisfies TemperCompletionCategory
