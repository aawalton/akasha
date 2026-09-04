import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsReduction = boolean

export const isReduction = {
  id: "01a05fce-1855-7941-a59d-a00cdec8cc05",
  pageTypeSlug: "boolean-property",
  slug: "is-reduction",
  propertySlug: "is-reduction",
  definition: "whether a trait lowers the metric it names",
} as const satisfies BooleanProperty
