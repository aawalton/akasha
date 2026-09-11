import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const locked = {
  id: "01a06053-b380-70ca-a7e1-de2fc777700b",
  type: "boolean-property",
  slug: "locked",
  propertySlug: "locked",
  definition: "whether an item is held back from being sold or destroyed",
  types: "ts",
} as const satisfies BooleanProperty
