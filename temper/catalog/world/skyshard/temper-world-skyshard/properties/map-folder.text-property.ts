import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const mapFolder = {
  id: "01a0d5d4-6c7e-7807-af25-d7e6fea60239",
  type: "page-type/text-property",
  slug: "map-folder",
  propertySlug: "map-folder",
  definition: "the folder of the game's map textures a map's tile texture sits in",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
