import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isPerfected = {
  id: "01a05fcd-f54f-7ea5-92d4-5bc87371235f",
  type: "boolean-property",
  slug: "is-perfected",
  propertySlug: "is-perfected",
  definition: "whether a set bonus is the perfected wording of itself",
  types: "ts",
} as const satisfies BooleanProperty
