import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const thievesGuildSkillLine = {
  id: "019db533-f381-7548-8695-31e6f53f865d",
  type: "page-type/temper-task",
  slug: "thieves-guild-skill-line",
  title: "Thieves Guild Skill Line",
  displayOrder: 0,
  esoCharacterId: "8796093038720681",
  character: "temper-account-character/shaestrel",
  completionCard: "temper-completion-category/characters-skill-lines",
  completionItemPath: ["117"],
  dueDate: "2026-09-25",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "next_character",
  priority: "p2",
  effectiveCharacter: "temper-account-character/shaestrel",
  lastCompletedAt: "2026-09-24T17:17:02.000Z",
  progress: "jsonl",
  progressTotal: 240,
  progressCurrent: 192,
} as const satisfies TemperTask
