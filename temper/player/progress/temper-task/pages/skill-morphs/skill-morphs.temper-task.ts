import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const skillMorphs = {
  id: "019db533-f381-756b-b84a-3e607b6d82ee",
  type: "page-type/temper-task",
  slug: "skill-morphs",
  title: "Skill Morphs",
  displayOrder: 0,
  character: "temper-account-character/lyonette-du-marquin",
  completionCard: "temper-completion-category/characters-skill-morphs",
  dueDate: "2026-10-30",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "all_characters",
  priority: "p4",
  effectiveCharacter: "temper-account-character/lyonette-du-marquin",
  lastCompletedAt: "2026-10-30T14:23:05.003Z",
  progress: "jsonl",
  progressTotal: 24480,
  progressCurrent: 24103,
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-30T14:23:05.475Z",
} as const satisfies TemperTask
