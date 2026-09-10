import type { TemperTask } from "../../temper-task.page-type.types.ts"

export const weeklyChallenges = {
  id: "019f9420-7fe5-7a60-8791-99f0d72cd040",
  pageTypeSlug: "temper-task",
  type: "temper-task",
  slug: "weekly-challenges",
  title: "Weekly Challenges",
  icon: "file-text",
  character: "erin-solstice",
  dueDate: "2026-09-08",
  rruleRule: "FREQ=WEEKLY;BYDAY=TU",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p3",
  lastCompletedAt: "2026-09-07T02:44:32.361Z",
} as const satisfies TemperTask
