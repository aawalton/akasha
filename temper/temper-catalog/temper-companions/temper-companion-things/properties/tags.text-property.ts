import type { TextProperty } from "@akasha/pages-system/text-property"

export type Tags = string

export const tags = {
  id: "01a05fcf-90fe-73a9-a63b-b7aa36ddc92a",
  pageTypeSlug: "text-property",
  slug: "tags",
  propertySlug: "tags",
  definition: "a note about how a skill behaves",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
