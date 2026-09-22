import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const tasksGuildSales = {
  id: "01a0c683-f817-7e8c-8134-b5da2ae9d5b9",
  type: "page-type/temper-completion-category",
  slug: "tasks-guild-sales",
  title: "Guild Sales",
  nodeId: "guild-sales",
  tab: "tasks",
  displayOrder: 0,
  parent: "tasks",
} as const satisfies TemperCompletionCategory
