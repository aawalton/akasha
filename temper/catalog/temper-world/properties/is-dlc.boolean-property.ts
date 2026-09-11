import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isDlc = {
  id: "01a05fc4-7a93-78f1-ba2d-9b6e3d39b9c8",
  type: "boolean-property",
  slug: "is-dlc",
  propertySlug: "is-dlc",
  definition: "whether a zone arrived as downloadable content",
  types: "ts",
} as const satisfies BooleanProperty
