import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountGrandMasterStations = {
  id: "01a05fcb-e4bc-720d-846e-8903de466771",
  type: "page-type/temper-completion-category",
  slug: "account-grand-master-stations",
  title: "Grand Master Crafting Stations",
  nodeId: "grand-master-stations",
  tab: "account",
  displayOrder: 7,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
