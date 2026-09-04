import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Available = boolean

export const available = {
  id: "01a05fba-ce3a-77e0-97a3-fec114943ed9",
  pageTypeSlug: "boolean-property",
  slug: "available",
  propertySlug: "available",
  definition: "whether the game offers this now",
} as const satisfies BooleanProperty
