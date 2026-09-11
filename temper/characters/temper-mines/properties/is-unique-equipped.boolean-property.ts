import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isUniqueEquipped = {
  id: "01a05fcd-f550-7988-b8c3-38d1296b72da",
  type: "boolean-property",
  slug: "is-unique-equipped",
  propertySlug: "is-unique-equipped",
  definition: "whether only one of an item may be worn at once",
  types: "ts",
} as const satisfies BooleanProperty
