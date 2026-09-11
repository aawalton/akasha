import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const requiredCp = {
  id: "01a05fcd-f554-7b02-9743-f4c0d2bde176",
  type: "number-property",
  slug: "required-cp",
  propertySlug: "required-cp",
  definition: "the champion rank an item asks for",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
