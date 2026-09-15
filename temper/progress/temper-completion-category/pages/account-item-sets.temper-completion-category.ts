import type { TemperCompletionCategory } from "akasha/temper/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountItemSets = {
  id: "01a05fcb-e4bc-784c-9677-29f648053336",
  type: "temper-completion-category",
  slug: "account-item-sets",
  title: "Item Sets",
  nodeId: "item-sets",
  tab: "account",
  displayOrder: 10,
  parent: "account",
} as const satisfies TemperCompletionCategory
