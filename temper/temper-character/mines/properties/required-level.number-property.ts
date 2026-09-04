import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RequiredLevel = number

export const requiredLevel = {
  id: "01a05fcd-f554-70a6-acad-274dfec6ba78",
  pageTypeSlug: "number-property",
  slug: "required-level",
  propertySlug: "required-level",
  definition: "the level an item asks for",
  max: null,
} as const satisfies NumberProperty
