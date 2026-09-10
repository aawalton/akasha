import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type CastConditionType = string

export const castConditionType = {
  id: "01a06193-6c9e-7d3f-8ec8-33900a372658",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "cast-condition-type",
  propertySlug: "type",
  definition: "what one test before a companion casts is a case of",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
