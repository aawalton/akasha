import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const chunkCount = {
  id: "01a05fcb-fd2d-7dd6-91a7-ef600287f306",
  type: "page-type/number-property",
  slug: "chunk-count",
  propertySlug: "chunk-count",
  definition: "how many files one reading of an inventory was cut into",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
