import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const canCompanionEquip = {
  id: "01a0e271-5ad0-7103-bd81-34638c81fff7",
  type: "page-type/temper-condition-value",
  slug: "can-companion-equip",
  title: "Can Companion Equip",
  key: "can-companion-equip",
  conditionField: "temper-condition-field/can-companion-equip",
  displayOrder: 0,
} as const satisfies TemperConditionValue
