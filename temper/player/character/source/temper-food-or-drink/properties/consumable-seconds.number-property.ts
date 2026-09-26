import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const consumableSeconds = {
  id: "01a0df76-1664-7c21-bfa6-3df59c438e6e",
  type: "page-type/number-property",
  slug: "consumable-seconds",
  propertySlug: "seconds",
  definition: "how many seconds a consumable's boons last once it is taken",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
