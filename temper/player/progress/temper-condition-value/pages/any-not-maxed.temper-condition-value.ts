import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const anyNotMaxed = {
  id: "01a0e2ad-70f7-7244-a667-3699dc700e9a",
  type: "page-type/temper-condition-value",
  slug: "any-not-maxed",
  title: "any below max",
  key: "any-not-maxed",
  conditionField: "temper-condition-field/required-skill-lines",
  displayOrder: 1,
} as const satisfies TemperConditionValue
