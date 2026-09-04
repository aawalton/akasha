import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsMovable = boolean

export const isMovable = {
  id: "01a06193-6cb0-7371-9915-23f0c0df1da7",
  pageTypeSlug: "boolean-property",
  slug: "is-movable",
  propertySlug: "is-movable",
  definition: "whether a test holds only while the target can be moved",
} as const satisfies BooleanProperty
