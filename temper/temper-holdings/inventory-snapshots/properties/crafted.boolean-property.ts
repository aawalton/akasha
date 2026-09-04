import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Crafted = boolean

export const crafted = {
  id: "01a06053-b37d-7332-a3b0-1ee73f225da9",
  pageTypeSlug: "boolean-property",
  slug: "crafted",
  propertySlug: "crafted",
  definition: "whether a player made an item",
} as const satisfies BooleanProperty
