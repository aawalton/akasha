import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const available = {
  id: "01a05fba-ce3a-77e0-97a3-fec114943ed9",
  type: "page-type/boolean-property",
  slug: "available",
  propertySlug: "available",
  definition: "whether the game offers this now",
  types: "ts",
} as const satisfies BooleanProperty
