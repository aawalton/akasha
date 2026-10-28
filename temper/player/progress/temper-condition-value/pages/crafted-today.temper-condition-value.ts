import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const craftedToday = {
  id: "01a183d2-67a2-7d2c-9b4a-494e294a6f73",
  type: "page-type/temper-condition-value",
  slug: "crafted-today",
  title: "Was Crafted Today",
  key: "crafted-today",
  conditionField: "temper-condition-field/crafted-today",
  displayOrder: 0,
  createdAt: "2026-10-28T18:42:46.817Z",
  updatedAt: "2026-10-28T18:42:46.817Z",
} as const satisfies TemperConditionValue
