import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const activeQuests = {
  id: "019eacc6-8a95-7996-a9e7-68db48fa97fc",
  type: "page-type/temper-task",
  slug: "active-quests",
  title: "Active Quests",
  icon: "file-text",
  completionCard: "temper-completion-category/tasks-active-quests",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p3",
} as const satisfies TemperTask
