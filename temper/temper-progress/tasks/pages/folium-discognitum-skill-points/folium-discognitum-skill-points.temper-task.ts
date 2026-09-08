import type { TemperTask } from "../../temper-task.page-type.ts"

export const foliumDiscognitumSkillPoints = {
  id: "019e8de6-ad2f-7cb0-90aa-4e45f07aec54",
  pageTypeSlug: "temper-task",
  slug: "folium-discognitum-skill-points",
  title: "Folium Discognitum Skill Points",
  icon: "file-text",
  character: "rafaema-coloseuvia",
  completionCardId: "skill-points",
  completionItemPath: ["general", "foliumDiscognitum"],
  dueDate: "2026-09-08",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "all_characters",
  priority: "p3",
  lastCompletedAt: "2026-09-07T16:27:38.330Z",
  progress: "jsonl",
  progressTotal: 40,
  progressCurrent: 38,
} as const satisfies TemperTask
