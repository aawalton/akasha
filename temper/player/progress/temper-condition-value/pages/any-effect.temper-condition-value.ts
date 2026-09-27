import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const anyEffect = {
  id: "01a0e2b0-36fb-7e20-bc15-ed1e74e56be7",
  type: "page-type/temper-condition-value",
  slug: "any-effect",
  title: "any effect",
  key: "any",
  conditionField: "temper-condition-field/potion-effects-mode",
  displayOrder: 0,
} as const satisfies TemperConditionValue
