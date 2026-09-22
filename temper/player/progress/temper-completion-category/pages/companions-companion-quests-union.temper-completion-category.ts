import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const companionsCompanionQuestsUnion = {
  id: "01a05fcb-e4c6-74e5-9d6e-e38038ef521f",
  type: "page-type/temper-completion-category",
  slug: "companions-companion-quests-union",
  title: "Companion Quests",
  nodeId: "companion-quests-union",
  tab: "companions",
  displayOrder: 1,
  parent: "temper-completion-category/companions",
} as const satisfies TemperCompletionCategory
