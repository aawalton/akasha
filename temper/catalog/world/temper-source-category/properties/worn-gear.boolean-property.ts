import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const wornGear = {
  id: "01a0df69-212e-764f-9064-2e85cd8ff6cc",
  type: "page-type/boolean-property",
  slug: "worn-gear",
  propertySlug: "worn-gear",
  definition: "whether a source category holds the gear a character or companion wears",
  types: "ts",
} as const satisfies BooleanProperty
