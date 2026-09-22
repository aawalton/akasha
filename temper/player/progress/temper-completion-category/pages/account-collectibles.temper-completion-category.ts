import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountCollectibles = {
  id: "01a05fcb-e4bc-7b79-af1f-ee70f431d306",
  type: "page-type/temper-completion-category",
  slug: "account-collectibles",
  title: "Collectibles",
  nodeId: "collectibles",
  tab: "account",
  displayOrder: 6,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
