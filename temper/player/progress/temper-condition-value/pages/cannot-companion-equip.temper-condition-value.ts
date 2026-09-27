import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const cannotCompanionEquip = {
  id: "01a0e271-5ad0-7bf5-a79f-81136a1964aa",
  type: "page-type/temper-condition-value",
  slug: "cannot-companion-equip",
  title: "Cannot Companion Equip",
  key: "cannot-companion-equip",
  conditionField: "temper-condition-field/can-companion-equip",
  displayOrder: 1,
} as const satisfies TemperConditionValue
