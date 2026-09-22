import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const effectWeaponTypes = {
  id: "01a05fe0-8428-7862-8b91-5d946d0ec754",
  type: "page-type/text-property",
  slug: "effect-weapon-types",
  propertySlug: "weapon-types",
  definition: "a weapon an effect covers",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
