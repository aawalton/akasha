import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isOffHandOnly = {
  id: "01a05fcd-aed1-7aee-a94b-06283cd02728",
  type: "boolean-property",
  slug: "is-off-hand-only",
  propertySlug: "is-off-hand-only",
  definition: "whether a weapon is in the off hand alone",
  types: "ts",
} as const satisfies BooleanProperty
