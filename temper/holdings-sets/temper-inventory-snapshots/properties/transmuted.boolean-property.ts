import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type Transmuted = boolean

export const transmuted = {
  id: "01a06053-b383-7e28-868b-20f52e4fdccb",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "transmuted",
  propertySlug: "transmuted",
  definition: "whether an item's trait was changed after the item was made",
} as const satisfies BooleanProperty
