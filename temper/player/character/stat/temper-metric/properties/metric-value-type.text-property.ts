import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const metricValueType = {
  id: "01a0de62-56d1-7499-a1a5-29a2e2ab26de",
  type: "page-type/text-property",
  slug: "metric-value-type",
  propertySlug: "value-type",
  definition: "the kind of number a stat is",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-26T15:43:01.841Z",
  updatedAt: "2026-09-26T15:43:08.000Z",
} as const satisfies TextProperty
