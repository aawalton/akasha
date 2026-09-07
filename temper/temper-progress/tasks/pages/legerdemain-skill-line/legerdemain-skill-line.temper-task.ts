import type { TemperTask } from "../../temper-task.page-type.ts"

export const legerdemainSkillLine = {
  id: "019db533-f381-75a0-8217-44d59f3c01b9",
  pageTypeSlug: "temper-task",
  slug: "legerdemain-skill-line",
  title: "Legerdemain Skill Line",
  displayOrder: 10,
  esoCharacterId: "8796093038720681",
  character: "yvlon-byres",
  completionCardId: "skill-lines",
  completionItemPath: ["111"],
  dueDate: "2026-09-06",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p2",
  effectiveCharacter: "belavierr",
  lastCompletedAt: "2026-08-20T12:07:56.000Z",
  progress: "jsonl",
  progressTotal: 400,
  progressCurrent: 291,
} as const satisfies TemperTask
