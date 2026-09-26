import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const metricValueSource = {
  id: "01a0deff-4b82-765f-855d-abd1f0155ad3",
  type: "page-type/text-property",
  slug: "metric-value-source",
  propertySlug: "value-source",
  definition: "where a stat's number comes from other than its formula",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
