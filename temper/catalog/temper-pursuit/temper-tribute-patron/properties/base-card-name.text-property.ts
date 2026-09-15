import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const baseCardName = {
  id: "01a06153-0ea9-7005-a9ba-ed8bf80d87f2",
  type: "page-type/text-property",
  slug: "base-card-name",
  propertySlug: "base-card-name",
  definition: "the name a card is shown under before it is upgraded",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
