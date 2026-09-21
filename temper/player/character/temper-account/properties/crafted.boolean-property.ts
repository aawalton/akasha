import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const crafted = {
  id: "01a06053-b37d-7332-a3b0-1ee73f225da9",
  type: "page-type/boolean-property",
  slug: "crafted",
  propertySlug: "crafted",
  definition: "whether a player made an item",
  types: "ts",
} as const satisfies BooleanProperty
