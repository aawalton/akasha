import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const weaponTypePower = {
  id: "01a05fd1-d43f-7b6d-b173-8c9bd644d9a3",
  type: "number-property",
  slug: "weapon-type-power",
  propertySlug: "weapon-power",
  definition: "the damage a weapon of this kind does at the top quality and level",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
