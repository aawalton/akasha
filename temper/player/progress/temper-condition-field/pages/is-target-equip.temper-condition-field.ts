import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const isTargetEquip = {
  id: "01a07209-6b51-7771-9690-c8e62b7b363f",
  type: "page-type/temper-condition-field",
  slug: "is-target-equip",
  title: "Needed for Target Character Build",
  key: "isTargetEquip",
  description:
    "An item's equip type, trait type and quality together must match a signature the target character build asks for where the value is `is-target-equip`.",
  createdAt: "2026-09-05T14:46:55.057Z",
  updatedAt: "2026-09-27T10:00:08.000Z",
} as const satisfies TemperConditionField
