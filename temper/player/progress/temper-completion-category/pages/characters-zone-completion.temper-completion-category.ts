import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersZoneCompletion = {
  id: "01a05fcb-e4c5-712f-90d1-8591a26ad11e",
  type: "page-type/temper-completion-category",
  slug: "characters-zone-completion",
  title: "Zone Completion",
  nodeId: "zone-completion",
  tab: "characters",
  displayOrder: 18,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
