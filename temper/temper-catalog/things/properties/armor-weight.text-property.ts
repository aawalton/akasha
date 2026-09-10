import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ArmorWeight = string

export const armorWeight = {
  id: "01a05fe0-8428-703e-953c-0bf31d04039f",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "armor-weight",
  propertySlug: "armor-weight",
  definition: "how heavy a piece of armor is",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
