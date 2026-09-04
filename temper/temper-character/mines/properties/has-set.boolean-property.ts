import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type HasSet = boolean

export const hasSet = {
  id: "01a05fcd-f54f-71b0-a87e-a05b0a786f0d",
  pageTypeSlug: "boolean-property",
  slug: "has-set",
  propertySlug: "has-set",
  definition: "whether an item belongs to a set",
} as const satisfies BooleanProperty
