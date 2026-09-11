import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isStandard = {
  id: "01a05fd1-d43c-7f22-8104-e5258fc481a1",
  type: "boolean-property",
  slug: "is-standard",
  propertySlug: "is-standard",
  definition: "whether a weight is one the game counts toward an armor skill line",
  types: "ts",
} as const satisfies BooleanProperty
