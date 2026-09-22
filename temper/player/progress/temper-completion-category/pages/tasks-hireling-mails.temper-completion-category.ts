import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const tasksHirelingMails = {
  id: "01a0c684-0987-7e1f-8a38-5a526012a406",
  type: "page-type/temper-completion-category",
  slug: "tasks-hireling-mails",
  title: "Hireling Mails",
  nodeId: "hireling-mails",
  tab: "tasks",
  displayOrder: 1,
  parent: "tasks",
} as const satisfies TemperCompletionCategory
