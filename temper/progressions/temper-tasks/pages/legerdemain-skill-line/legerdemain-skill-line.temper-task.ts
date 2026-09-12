import type { TemperTask } from "akasha/temper/progressions/temper-tasks/temper-task.page-type.types.ts"

export const legerdemainSkillLine = {
  id: "019db533-f381-75a0-8217-44d59f3c01b9",
  type: "temper-task",
  slug: "legerdemain-skill-line",
  title: "Legerdemain Skill Line",
  displayOrder: 10,
  esoCharacterId: "8796093038720681",
  character: "yvlon-byres",
  completionCardId: "skill-lines",
  completionItemPath: ["111"],
  dueDate: "2026-09-13",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p2",
  effectiveCharacter: "belavierr",
  lastCompletedAt: "2026-09-12T12:34:21.083Z",
  progress: "jsonl",
  progressTotal: 400,
  progressCurrent: 291,
} as const satisfies TemperTask
