import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type BuffName = string

export const buffName = {
  id: "01a06193-6ca5-7e1f-b411-54b1704f29e2",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "buff-name",
  propertySlug: "buff",
  definition: "the helpful effect an effect puts on whoever it lands on",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
