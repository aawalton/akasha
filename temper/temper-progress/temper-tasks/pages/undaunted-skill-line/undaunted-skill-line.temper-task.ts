import type { TemperTask } from "../../temper-task.page-type.ts"

export const undauntedSkillLine = {
  id: "019db533-f381-755a-8ee3-42d80e807395",
  pageTypeSlug: "temper-task",
  slug: "undaunted-skill-line",
  title: "Undaunted Skill Line",
  displayOrder: 6,
  esoCharacterId: "8796093025190173",
  character: "shaestrel",
  completionCardId: "skill-lines",
  completionItemPath: ["55"],
  dueDate: "2026-09-08",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p2",
  effectiveCharacter: "belavierr",
  lastCompletedAt: "2026-09-07T16:27:37.677Z",
  progress: "jsonl",
  progressTotal: 200,
  progressCurrent: 171,
} as const satisfies TemperTask
