import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const weeklyChallenges = {
  id: "019f9420-7fe5-7a60-8791-99f0d72cd040",
  type: "page-type/temper-task",
  slug: "weekly-challenges",
  title: "Weekly Challenges",
  icon: "file-text",
  character: "temper-account-character/erin-solstice",
  dueDate: "2026-10-27",
  rruleRule: "FREQ=WEEKLY;BYDAY=TU",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "character",
  priority: "p3",
  lastCompletedAt: "2026-10-20T18:25:58.956Z",
  createdAt: "2026-07-24T12:36:25.701Z",
  updatedAt: "2026-10-20T18:25:59.599Z",
} as const satisfies TemperTask
