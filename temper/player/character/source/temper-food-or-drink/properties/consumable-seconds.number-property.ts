import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const consumableSeconds = {
  id: "01a0df76-1664-7c21-bfa6-3df59c438e6e",
  type: "page-type/number-property",
  slug: "consumable-seconds",
  propertySlug: "seconds",
  definition: "how many seconds a consumable's boons last once it is taken",
  max: null,
  types: "ts",
  createdAt: "2026-09-26T20:44:13.284Z",
  updatedAt: "2026-09-26T20:44:17.000Z",
} as const satisfies NumberProperty
