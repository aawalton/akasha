import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type Known = boolean

export const known = {
  id: "01a06053-b37f-7dcb-b143-8dec78863984",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "known",
  propertySlug: "known",
  definition: "whether the account already knows what an item teaches",
} as const satisfies BooleanProperty
