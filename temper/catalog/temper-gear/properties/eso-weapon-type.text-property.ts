import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const esoWeaponType = {
  id: "01a05fd1-d43b-781e-b83d-8550054c5d2b",
  type: "text-property",
  slug: "eso-weapon-type",
  propertySlug: "eso-weapon-type",
  definition: "the constant The Elder Scrolls Online names a weapon kind by in its own code",
  maxLength: 200,
  nameFormat: "name-format/upper-snake-case",
  types: "ts",
} as const satisfies TextProperty
