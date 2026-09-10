import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type EsoWeaponType = string

export const esoWeaponType = {
  id: "01a05fd1-d43b-781e-b83d-8550054c5d2b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "eso-weapon-type",
  propertySlug: "eso-weapon-type",
  definition: "the constant The Elder Scrolls Online names a weapon kind by in its own code",
  maxLength: 200,
  nameFormat: "name-format/upper-snake-case",
} as const satisfies TextProperty
