import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const canGiveMaxRewards = {
  id: "01a0e271-5ad0-7417-a561-f9904ec197bd",
  type: "page-type/temper-condition-value",
  slug: "can-give-max-rewards",
  title: "Can Give Max Rewards",
  key: "can-give-max-rewards",
  conditionField: "temper-condition-field/can-give-max-rewards",
  displayOrder: 0,
} as const satisfies TemperConditionValue
