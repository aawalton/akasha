import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsContainer = boolean

export const isContainer = {
  id: "01a06053-b37e-714f-8a7e-9957b3964234",
  pageTypeSlug: "boolean-property",
  slug: "is-container",
  propertySlug: "is-container",
  definition: "whether an item opens into other items",
} as const satisfies BooleanProperty
