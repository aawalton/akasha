import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const tasksActiveQuests = {
  id: "01a0c684-1b9c-7b4d-a28a-ab504e36049f",
  type: "page-type/temper-completion-category",
  slug: "tasks-active-quests",
  title: "Active Quests",
  nodeId: "active-quests",
  tab: "tasks",
  displayOrder: 2,
  parent: "temper-completion-category/tasks",
} as const satisfies TemperCompletionCategory
