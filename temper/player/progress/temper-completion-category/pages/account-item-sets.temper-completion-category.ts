import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountItemSets = {
  id: "01a05fcb-e4bc-784c-9677-29f648053336",
  type: "page-type/temper-completion-category",
  slug: "account-item-sets",
  title: "Item Sets",
  nodeId: "item-sets",
  tab: "account",
  displayOrder: 10,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
