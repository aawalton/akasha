import type { TextProperty } from "@akasha/pages/text-property"

export type EffectWeaponTypes = string

export const effectWeaponTypes = {
  id: "01a05fe0-8428-7862-8b91-5d946d0ec754",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "effect-weapon-types",
  propertySlug: "weapon-types",
  definition: "a weapon an effect holds for",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
