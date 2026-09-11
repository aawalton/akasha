import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const statusName = {
  id: "01a06193-6ca6-70c5-8795-e36d5dd82acf",
  type: "text-property",
  slug: "status-name",
  propertySlug: "status",
  definition: "the status an effect applies",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
