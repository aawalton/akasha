import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const canOpen = {
  id: "01a07209-6b50-72dd-a9b2-44554e1af2e7",
  type: "page-type/temper-condition-field",
  slug: "can-open",
  title: "Can Open",
  key: "canOpen",
  description:
    "The item must be a container whose cooldown group has expired, and a transmute crystal container fails once the held crystal count reaches the cap.",
  createdAt: "2026-09-05T14:46:55.056Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
