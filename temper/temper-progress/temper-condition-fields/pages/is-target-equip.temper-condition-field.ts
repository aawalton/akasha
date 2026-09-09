import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const isTargetEquip = {
  id: "01a07209-6b51-7771-9690-c8e62b7b363f",
  pageTypeSlug: "temper-condition-field",
  slug: "is-target-equip",
  title: "Target Build Equipment",
  key: "isTargetEquip",
  description:
    "An item's equip type, trait type and quality together must match a signature the target character build asks for where the value is `is-target-equip`.",
} as const satisfies TemperConditionField
