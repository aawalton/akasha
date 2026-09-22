import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const worldName = {
  id: "01a0675a-f185-7ba7-85f2-df84ed542a9e",
  type: "page-type/text-property",
  slug: "world-name",
  propertySlug: "world-name",
  definition: "a reading's megaserver",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
