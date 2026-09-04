import type { TextProperty } from "@akasha/pages-system/text-property"

export type MetricId = string

export const metricId = {
  id: "01a05fb0-3ced-7636-a899-431b497b3f1f",
  pageTypeSlug: "text-property",
  slug: "metric-id",
  propertySlug: "metric-id",
  definition: "the number an effect moves",
  max: 200,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a metric." }],
} as const satisfies TextProperty
