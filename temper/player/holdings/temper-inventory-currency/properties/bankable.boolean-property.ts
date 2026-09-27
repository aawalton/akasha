import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const bankable = {
  id: "01a0e0d4-8faf-700e-bf0d-916d24a7b94f",
  type: "page-type/boolean-property",
  slug: "bankable",
  propertySlug: "bankable",
  definition: "whether a currency can be put in the bank",
  types: "ts",
} as const satisfies BooleanProperty
