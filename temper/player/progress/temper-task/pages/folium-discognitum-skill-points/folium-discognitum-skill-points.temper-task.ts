import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const foliumDiscognitumSkillPoints = {
  id: "019e8de6-ad2f-7cb0-90aa-4e45f07aec54",
  type: "page-type/temper-task",
  slug: "folium-discognitum-skill-points",
  title: "Folium Discognitum Skill Points",
  icon: "file-text",
  character: "temper-account-character/rafaema-coloseuvia",
  completionCard: "temper-completion-category/characters-skill-points",
  completionItemPath: ["general", "foliumDiscognitum"],
  dueDate: "2026-09-20",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "all_characters",
  priority: "p3",
  lastCompletedAt: "2026-09-21T15:56:56.160Z",
  progress: "jsonl",
  progressTotal: 40,
  progressCurrent: 40,
  completedAt: "2026-09-21T15:56:56.160Z",
} as const satisfies TemperTask
