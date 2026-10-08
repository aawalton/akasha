import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const anyEffect = {
  id: "01a0e2b0-36fb-7e20-bc15-ed1e74e56be7",
  type: "page-type/temper-condition-value",
  slug: "any-effect",
  title: "any effect",
  key: "any",
  conditionField: "temper-condition-field/potion-effects-mode",
  displayOrder: 0,
  createdAt: "2026-09-27T11:46:34.363Z",
  updatedAt: "2026-09-27T11:46:42.000Z",
} as const satisfies TemperConditionValue
