import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type Tags = List<string>

export const tags = {
  id: "01a05fcf-90fe-73a9-a63b-b7aa36ddc92a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "tags",
  propertySlug: "tags",
  definition: "a note about how a skill behaves",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
