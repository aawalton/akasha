import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const storyZoneQuestSkillPoints = {
  id: "01a0c624-3916-7fe9-a515-b012dbb17027",
  type: "page-type/temper-task",
  slug: "story-zone-quest-skill-points",
  title: "Story Zone Quest Skill Points",
  icon: "file-text",
  completionCardId: "skill-points",
  completionItemPath: ["storyZoneQuests"],
  dueDate: "2026-09-21",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p3",
  progress: "jsonl",
  progressCurrent: 1408,
  progressTotal: 3280,
  effectiveCharacter: "erin-solstice",
  character: "temper-account-character/erin-solstice",
} as const satisfies TemperTask
