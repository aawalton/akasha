import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const anyNotMaxed = {
  id: "01a0e2ad-70f7-7244-a667-3699dc700e9a",
  type: "page-type/temper-condition-value",
  slug: "any-not-maxed",
  title: "any below max",
  key: "any-not-maxed",
  conditionField: "temper-condition-field/required-skill-lines",
  displayOrder: 1,
  createdAt: "2026-09-27T11:43:32.599Z",
  updatedAt: "2026-09-27T11:43:39.000Z",
} as const satisfies TemperConditionValue
