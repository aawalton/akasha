import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const storyZoneQuestSkillPoints = {
  id: "01a0c624-3916-7fe9-a515-b012dbb17027",
  type: "page-type/temper-task",
  slug: "story-zone-quest-skill-points",
  title: "Story Zone Quest Skill Points",
  icon: "file-text",
  character: "temper-account-character/maviola-el",
  completionCard: "temper-completion-category/characters-skill-points",
  completionItemPath: ["storyZoneQuests"],
  dueDate: "2026-09-25",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "temper-account/alanarre",
  scope: "next_character",
  priority: "p4",
  effectiveCharacter: "temper-account-character/maviola-el",
  lastCompletedAt: "2026-09-25T00:55:34.369Z",
  progress: "jsonl",
  progressTotal: 3280,
  progressCurrent: 1418,
} as const satisfies TemperTask
