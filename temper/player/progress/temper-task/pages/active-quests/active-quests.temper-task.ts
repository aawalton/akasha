import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const activeQuests = {
  id: "019eacc6-8a95-7996-a9e7-68db48fa97fc",
  type: "page-type/temper-task",
  slug: "active-quests",
  title: "Active Quests",
  icon: "file-text",
  completionCard: "temper-completion-category/tasks-active-quests",
  accountPage: "temper-account/alanarre",
  scope: "all_characters",
  priority: "p3",
  createdAt: "2026-06-09T14:25:53.301Z",
  updatedAt: "2026-09-24T16:26:32.000Z",
} as const satisfies TemperTask
