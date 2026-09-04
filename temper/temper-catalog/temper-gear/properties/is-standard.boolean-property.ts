import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsStandard = boolean

export const isStandard = {
  id: "01a05fd1-d43c-7f22-8104-e5258fc481a1",
  pageTypeSlug: "boolean-property",
  slug: "is-standard",
  propertySlug: "is-standard",
  definition: "whether a weight is one the game counts toward an armor skill line",
} as const satisfies BooleanProperty
