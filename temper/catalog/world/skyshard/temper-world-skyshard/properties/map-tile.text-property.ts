import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const mapTile = {
  id: "01a0d5d4-6c7f-735f-a0cb-02ffa3c42902",
  type: "page-type/text-property",
  slug: "map-tile",
  propertySlug: "map-tile",
  definition: "the name a map's tile texture has inside its folder",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
