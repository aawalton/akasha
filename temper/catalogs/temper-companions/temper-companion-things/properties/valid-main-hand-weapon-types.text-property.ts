import type { TextProperty } from "@akasha/pages/text-property"

export type ValidMainHandWeaponTypes = string

export const validMainHandWeaponTypes = {
  id: "01a05fcd-aed3-794f-9b17-277957dc2758",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "valid-main-hand-weapon-types",
  propertySlug: "valid-main-hand-weapon-types",
  definition: "a weapon a pairing takes in the main hand",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
