import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const includeInChildAggregates = {
  id: "01a05fcb-d654-77c9-bc2c-4f4d426d11c3",
  type: "boolean-property",
  slug: "include-in-child-aggregates",
  propertySlug: "include-in-child-aggregates",
  definition: "whether a node's own number is counted into the totals beneath it",
  types: "ts",
} as const satisfies BooleanProperty
