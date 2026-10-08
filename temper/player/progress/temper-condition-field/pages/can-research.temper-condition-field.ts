import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const canResearch = {
  id: "01a07209-6b50-7646-9a92-24244b55870e",
  type: "page-type/temper-condition-field",
  slug: "can-research",
  title: "Can Research",
  key: "canResearch",
  description:
    "At least one character must have the item's trait unresearched for the item's crafting type where the value is `can-research`.",
  createdAt: "2026-09-05T14:46:55.056Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
