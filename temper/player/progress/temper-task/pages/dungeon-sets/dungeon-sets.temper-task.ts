import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const dungeonSets = {
  id: "019eacc6-8d4e-706d-9bd1-72dd156de32a",
  type: "page-type/temper-task",
  slug: "dungeon-sets",
  title: "Dungeon Sets",
  icon: "file-text",
  accountPage: "temper-account/alanarre",
  scope: "all_characters",
  priority: "p3",
  completionCard: "temper-completion-category/tasks-dungeon-sets",
} as const satisfies TemperTask
