import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const allMaxed = {
  id: "01a0e2ad-70f6-7e7e-9cb5-e6d614cde6a8",
  type: "page-type/temper-condition-value",
  slug: "all-maxed",
  title: "all maxed",
  key: "all-maxed",
  conditionField: "temper-condition-field/required-skill-lines",
  displayOrder: 0,
} as const satisfies TemperConditionValue
