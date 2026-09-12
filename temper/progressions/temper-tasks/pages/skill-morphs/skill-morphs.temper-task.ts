import type { TemperTask } from "akasha/temper/progressions/temper-tasks/temper-task.page-type.types.ts"

export const skillMorphs = {
  id: "019db533-f381-756b-b84a-3e607b6d82ee",
  type: "temper-task",
  slug: "skill-morphs",
  title: "Skill Morphs",
  displayOrder: 0,
  character: "lyonette-du-marquin",
  completionCardId: "skill-morphs",
  dueDate: "2026-09-13",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p4",
  effectiveCharacter: "archmage-amerys",
  lastCompletedAt: "2026-09-12T12:51:34.000Z",
  progress: "jsonl",
  progressTotal: 24480,
  progressCurrent: 24051,
} as const satisfies TemperTask
