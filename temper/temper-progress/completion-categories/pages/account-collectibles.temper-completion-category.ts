import type { TemperCompletionCategory } from "../temper-completion-category.page-type.ts"

export const accountCollectibles = {
  id: "01a05fcb-e4bc-7b79-af1f-ee70f431d306",
  pageTypeSlug: "temper-completion-category",
  slug: "account-collectibles",
  title: "Collectibles",
  nodeId: "collectibles",
  tab: "account",
  displayOrder: 6,
  parent: "account",
} as const satisfies TemperCompletionCategory
