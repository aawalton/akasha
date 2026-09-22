import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersAllianceRank = {
  id: "01a05fcb-e4be-7e4d-992b-7b9ec6fe2b92",
  type: "page-type/temper-completion-category",
  slug: "characters-alliance-rank",
  title: "Alliance Rank",
  nodeId: "alliance-rank",
  tab: "characters",
  displayOrder: 1,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
