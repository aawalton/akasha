import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const requiredLevel = {
  id: "01a05fcd-f554-70a6-acad-274dfec6ba78",
  type: "number-property",
  slug: "required-level",
  propertySlug: "required-level",
  definition: "the level an item asks for",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
