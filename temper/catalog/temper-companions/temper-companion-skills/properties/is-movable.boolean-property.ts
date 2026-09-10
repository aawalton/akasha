import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isMovable = {
  id: "01a06193-6cb0-7371-9915-23f0c0df1da7",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "is-movable",
  propertySlug: "is-movable",
  definition: "whether a test holds only while the target can be moved",
  types: "ts",
} as const satisfies BooleanProperty
