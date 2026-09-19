import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const transmuted = {
  id: "01a06053-b383-7e28-868b-20f52e4fdccb",
  type: "page-type/boolean-property",
  slug: "transmuted",
  propertySlug: "transmuted",
  definition: "whether an item's trait was changed after the item was made",
  types: "ts",
} as const satisfies BooleanProperty
