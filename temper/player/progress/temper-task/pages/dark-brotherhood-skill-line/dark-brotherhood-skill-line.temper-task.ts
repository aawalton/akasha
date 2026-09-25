import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const darkBrotherhoodSkillLine = {
  id: "019db533-f381-75f7-aafa-ced3b56c5229",
  type: "page-type/temper-task",
  slug: "dark-brotherhood-skill-line",
  title: "Dark Brotherhood Skill Line",
  displayOrder: 11,
  character: "temper-account-character/yvlon-byres",
  completionCard: "temper-completion-category/characters-skill-lines",
  completionItemPath: ["118"],
  dueDate: "2026-09-26",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "next_character",
  priority: "p2",
  effectiveCharacter: "temper-account-character/yvlon-byres",
  lastCompletedAt: "2026-09-25T13:36:12.000Z",
  progress: "jsonl",
  progressTotal: 240,
  progressCurrent: 152,
} as const satisfies TemperTask
