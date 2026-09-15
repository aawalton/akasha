import type { TemperTask } from "akasha/temper/progress/temper-task/temper-task.page-type.types.ts"

export const antiquityLore = {
  id: "019db533-f381-762c-874e-b381b6005239",
  type: "page-type/temper-task",
  slug: "antiquity-lore",
  title: "Antiquity Lore",
  displayOrder: 0,
  esoCharacterId: "8796093022338107",
  character: "erin-solstice",
  completionCardId: "antiquity-lore",
  dueDate: "2026-09-22",
  rruleRule: "FREQ=WEEKLY",
  rruleAnchorFromCompletion: false,
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  scope: "character",
  priority: "p2",
  effectiveCharacter: "erin-solstice",
  lastCompletedAt: "2026-09-15T22:23:12.878Z",
} as const satisfies TemperTask
