import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const isTargetCompanionEquip = {
  id: "01a07209-6b51-7ed7-b1f4-bf281d0c584d",
  pageTypeSlug: "temper-condition-field",
  slug: "is-target-companion-equip",
  title: "Target Companion Equipment",
  key: "isTargetCompanionEquip",
  description:
    "An item's equip type, trait type and quality together must match a signature the target companion build asks for, looked up apart from the character build.",
} as const satisfies TemperConditionField
