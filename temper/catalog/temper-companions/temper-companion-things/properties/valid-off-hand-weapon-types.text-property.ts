import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const validOffHandWeaponTypes = {
  id: "01a05fcd-aed3-7341-ac9b-0786c5adcd7c",
  type: "text-property",
  slug: "valid-off-hand-weapon-types",
  propertySlug: "valid-off-hand-weapon-types",
  definition: "a weapon a pairing takes in the off hand",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
