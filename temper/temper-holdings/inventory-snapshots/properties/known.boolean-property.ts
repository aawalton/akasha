import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Known = boolean

export const known = {
  id: "01a06053-b37f-7dcb-b143-8dec78863984",
  pageTypeSlug: "boolean-property",
  slug: "known",
  propertySlug: "known",
  definition: "whether the account already knows what an item teaches",
} as const satisfies BooleanProperty
