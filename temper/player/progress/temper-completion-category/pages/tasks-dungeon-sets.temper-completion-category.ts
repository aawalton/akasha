import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const tasksDungeonSets = {
  id: "01a0c684-4064-7982-958d-3bf2a4686218",
  type: "page-type/temper-completion-category",
  slug: "tasks-dungeon-sets",
  title: "Dungeon Sets",
  nodeId: "dungeon-sets",
  tab: "tasks",
  displayOrder: 4,
  parent: "temper-completion-category/tasks",
} as const satisfies TemperCompletionCategory
