import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountAccountQuests = {
  id: "01a05fcb-e4b7-7383-b572-08165ad13c27",
  type: "page-type/temper-completion-category",
  slug: "account-account-quests",
  title: "Quests",
  nodeId: "account-quests",
  tab: "account",
  displayOrder: 13,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
