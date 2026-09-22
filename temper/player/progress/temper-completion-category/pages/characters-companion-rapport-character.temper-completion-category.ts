import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersCompanionRapportCharacter = {
  id: "01a05fcb-e4bf-7cec-b3f1-35b9c65a87e1",
  type: "page-type/temper-completion-category",
  slug: "characters-companion-rapport-character",
  title: "Companion Rapport",
  nodeId: "companion-rapport-character",
  tab: "characters",
  displayOrder: 6,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
