import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const isTargetCompanionEquip = {
  id: "01a07209-6b51-7ed7-b1f4-bf281d0c584d",
  type: "page-type/temper-condition-field",
  slug: "is-target-companion-equip",
  title: "Needed for Target Companion Build",
  key: "isTargetCompanionEquip",
  description:
    "An item's equip type, trait type and quality together must match a signature the target companion build asks for, looked up apart from the character build.",
  createdAt: "2026-09-05T14:46:55.057Z",
  updatedAt: "2026-09-27T10:00:08.000Z",
} as const satisfies TemperConditionField
