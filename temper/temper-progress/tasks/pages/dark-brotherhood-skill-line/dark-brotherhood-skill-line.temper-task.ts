import type { TemperTask } from "../../temper-task.page-type.ts"

export const darkBrotherhoodSkillLine = {
  id: "019db533-f381-75f7-aafa-ced3b56c5229",
  pageTypeSlug: "temper-task",
  slug: "dark-brotherhood-skill-line",
  title: "Dark Brotherhood Skill Line",
  displayOrder: 11,
  character: "yvlon-byres",
  completionCardId: "skill-lines",
  completionItemPath: ["118"],
  dueDate: "2026-09-06",
  rruleRule: "FREQ=DAILY;INTERVAL=1",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p2",
  effectiveCharacter: "belavierr",
  lastCompletedAt: "2026-08-20T12:10:07.000Z",
  progress: "jsonl",
  progressTotal: 240,
  progressCurrent: 151,
} as const satisfies TemperTask
