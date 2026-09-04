import type { TextProperty } from "@akasha/pages-system/text-property"

export type BaseCardName = string

export const baseCardName = {
  id: "01a06153-0ea9-7005-a9ba-ed8bf80d87f2",
  pageTypeSlug: "text-property",
  slug: "base-card-name",
  propertySlug: "base-card-name",
  definition: "the name a card is shown under before it is upgraded",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
