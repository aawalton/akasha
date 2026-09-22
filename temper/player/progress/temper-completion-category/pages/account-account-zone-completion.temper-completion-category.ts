import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountAccountZoneCompletion = {
  id: "01a05fcb-e4ba-7505-a1f8-217c31fef49f",
  type: "page-type/temper-completion-category",
  slug: "account-account-zone-completion",
  title: "Zone Completion",
  nodeId: "account-zone-completion",
  tab: "account",
  displayOrder: 18,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
