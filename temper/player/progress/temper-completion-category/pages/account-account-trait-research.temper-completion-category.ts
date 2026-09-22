import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountAccountTraitResearch = {
  id: "01a05fcb-e4ba-7c9f-aeb1-4a3817beaf2c",
  type: "page-type/temper-completion-category",
  slug: "account-account-trait-research",
  title: "Crafting Traits",
  nodeId: "account-trait-research",
  tab: "account",
  displayOrder: 9,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
