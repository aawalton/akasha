import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountAccountAchievements = {
  id: "01a05fcb-e4b6-7904-ae6a-b34c15b65284",
  type: "page-type/temper-completion-category",
  slug: "account-account-achievements",
  title: "Achievements",
  nodeId: "account-achievements",
  tab: "account",
  displayOrder: 0,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
