import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const canCompanionEquip = {
  id: "01a07209-6b4f-74b1-9165-e9b395509920",
  pageTypeSlug: "temper-condition-field",
  slug: "can-companion-equip",
  title: "Can Companion Equip",
  key: "canCompanionEquip",
  description:
    "An item's trait number must fall in the range 34 through 60 where the value is `can-companion-equip`, and outside that range where the value is `cannot-companion-equip`.",
} as const satisfies TemperConditionField
