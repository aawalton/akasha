import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const tasksInventoryManagement = {
  id: "01a0c684-2e44-7f2e-9e94-6c98491c85a2",
  type: "page-type/temper-completion-category",
  slug: "tasks-inventory-management",
  title: "Inventory Management",
  nodeId: "inventory-management",
  tab: "tasks",
  displayOrder: 3,
  parent: "temper-completion-category/tasks",
} as const satisfies TemperCompletionCategory
