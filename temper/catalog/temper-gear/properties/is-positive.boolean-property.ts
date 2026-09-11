import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isPositive = {
  id: "01a05fd1-d43c-78a4-ae87-1501c6ab4f40",
  type: "boolean-property",
  slug: "is-positive",
  propertySlug: "is-positive",
  definition: "whether an alchemy effect helps whoever drinks it",
  types: "ts",
} as const satisfies BooleanProperty
