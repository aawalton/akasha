import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isContainer = {
  id: "01a06053-b37e-714f-8a7e-9957b3964234",
  type: "boolean-property",
  slug: "is-container",
  propertySlug: "is-container",
  definition: "whether an item opens into other items",
  types: "ts",
} as const satisfies BooleanProperty
