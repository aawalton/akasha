import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const metricPolarity = {
  id: "01a0de62-56d0-7872-abc0-9bcc96dde404",
  type: "page-type/text-property",
  slug: "metric-polarity",
  propertySlug: "polarity",
  definition: "whether more of a stat is better or worse",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-26T15:43:01.840Z",
  updatedAt: "2026-09-26T15:43:08.000Z",
} as const satisfies TextProperty
