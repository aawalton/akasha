import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const legerdemainSkillLine = {
  id: "019db533-f381-75a0-8217-44d59f3c01b9",
  type: "page-type/temper-task",
  slug: "legerdemain-skill-line",
  title: "Legerdemain Skill Line",
  displayOrder: 10,
  esoCharacterId: "8796093038720681",
  character: "temper-account-character/yvlon-byres",
  completionCard: "temper-completion-category/characters-skill-lines",
  completionItemPath: ["111"],
  dueDate: "2026-09-25",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "next_character",
  priority: "p2",
  effectiveCharacter: "temper-account-character/yvlon-byres",
  lastCompletedAt: "2026-09-24T15:50:24.000Z",
  progress: "jsonl",
  progressTotal: 400,
  progressCurrent: 292,
} as const satisfies TemperTask
