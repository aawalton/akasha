import type { TemperTask } from "akasha/temper/player/progress/temper-task/temper-task.page-type.types.ts"

export const cadwellSAlmanac = {
  id: "019db533-f381-7609-8205-f9904634be23",
  type: "page-type/temper-task",
  slug: "cadwell-s-almanac",
  title: "Cadwell's Almanac",
  displayOrder: 13,
  esoCharacterId: "8796093041077613",
  completionCard: "temper-completion-category/characters-cadwells-almanac",
  dueDate: "2026-09-23",
  rruleRule: "FREQ=DAILY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "next_character",
  priority: "p3",
  lastCompletedAt: "2026-08-19T14:32:40.000Z",
  progress: "jsonl",
  progressTotal: 1560,
  progressCurrent: 1560,
} as const satisfies TemperTask
