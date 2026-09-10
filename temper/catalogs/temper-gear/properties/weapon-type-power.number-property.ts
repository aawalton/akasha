import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type WeaponTypePower = number

export const weaponTypePower = {
  id: "01a05fd1-d43f-7b6d-b173-8c9bd644d9a3",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "weapon-type-power",
  propertySlug: "weapon-power",
  definition: "the damage a weapon of this kind does at the top quality and level",
  max: null,
} as const satisfies NumberProperty
