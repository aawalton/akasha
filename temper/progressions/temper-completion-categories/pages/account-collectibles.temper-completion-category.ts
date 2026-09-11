import type { TemperCompletionCategory } from "akasha/temper/progressions/temper-completion-categories/temper-completion-category.page-type.types.ts"

export const accountCollectibles = {
  id: "01a05fcb-e4bc-7b79-af1f-ee70f431d306",
  type: "temper-completion-category",
  slug: "account-collectibles",
  title: "Collectibles",
  nodeId: "collectibles",
  tab: "account",
  displayOrder: 6,
  parent: "account",
} as const satisfies TemperCompletionCategory
