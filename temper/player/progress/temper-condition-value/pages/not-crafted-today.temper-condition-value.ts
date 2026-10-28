import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notCraftedToday = {
  id: "01a183d2-67a2-728c-80aa-dc7d81817ee4",
  type: "page-type/temper-condition-value",
  slug: "not-crafted-today",
  title: "Was Not Crafted Today",
  key: "not-crafted-today",
  conditionField: "temper-condition-field/crafted-today",
  displayOrder: 1,
  createdAt: "2026-10-28T18:42:46.817Z",
  updatedAt: "2026-10-28T18:42:46.817Z",
} as const satisfies TemperConditionValue
