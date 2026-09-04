import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsDlc = boolean

export const isDlc = {
  id: "01a05fc4-7a93-78f1-ba2d-9b6e3d39b9c8",
  pageTypeSlug: "boolean-property",
  slug: "is-dlc",
  propertySlug: "is-dlc",
  definition: "whether a zone arrived as downloadable content",
} as const satisfies BooleanProperty
