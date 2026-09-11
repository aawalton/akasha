import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const isReduction = {
  id: "01a05fce-1855-7941-a59d-a00cdec8cc05",
  type: "boolean-property",
  slug: "is-reduction",
  propertySlug: "is-reduction",
  definition: "whether a trait lowers the metric it names",
  types: "ts",
} as const satisfies BooleanProperty
