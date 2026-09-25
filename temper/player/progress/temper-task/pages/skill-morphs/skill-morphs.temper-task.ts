import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const skillMorphs = {
  id: "019db533-f381-756b-b84a-3e607b6d82ee",
  type: "page-type/temper-task",
  slug: "skill-morphs",
  title: "Skill Morphs",
  displayOrder: 0,
  character: "temper-account-character/lyonette-du-marquin",
  completionCard: "temper-completion-category/characters-skill-morphs",
  dueDate: "2026-09-26",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "all_characters",
  priority: "p4",
  effectiveCharacter: "temper-account-character/lyonette-du-marquin",
  lastCompletedAt: "2026-09-25T14:03:15.188Z",
  progress: "jsonl",
  progressTotal: 24480,
  progressCurrent: 24075,
} as const satisfies TemperTask
