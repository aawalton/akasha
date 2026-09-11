import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const validMainHandWeaponTypes = {
  id: "01a05fcd-aed3-794f-9b17-277957dc2758",
  type: "text-property",
  slug: "valid-main-hand-weapon-types",
  propertySlug: "valid-main-hand-weapon-types",
  definition: "a weapon a pairing takes in the main hand",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
