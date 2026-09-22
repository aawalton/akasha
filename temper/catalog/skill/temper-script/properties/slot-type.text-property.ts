import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const slotType = {
  id: "01a05fca-cb87-767f-90a1-977b2c340bc6",
  type: "page-type/text-property",
  slug: "slot-type",
  propertySlug: "slot-type",
  definition: "a script's slot in a grimoire",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
