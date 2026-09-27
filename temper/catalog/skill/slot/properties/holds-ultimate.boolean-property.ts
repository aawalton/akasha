import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const holdsUltimate = {
  id: "01a0e1cd-1c71-7543-8aab-00c86553afc2",
  type: "page-type/boolean-property",
  slug: "holds-ultimate",
  propertySlug: "holds-ultimate",
  definition: "whether the slot holds a bar's ultimate rather than an active skill",
  types: "ts",
} as const satisfies BooleanProperty
