import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type StatusName = string

export const statusName = {
  id: "01a06193-6ca6-70c5-8795-e36d5dd82acf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "status-name",
  propertySlug: "status",
  definition: "the status an effect applies",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
