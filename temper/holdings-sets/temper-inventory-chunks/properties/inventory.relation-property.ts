import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type Inventory = Slug

export const inventory = {
  id: "01a05fcb-fd2e-7b76-8f9e-ab136135d3a5",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "inventory",
  propertySlug: "inventory",
  definition: "the reading a slice belongs to",
  targetPageType: "page-type/temper-inventory-snapshot",
} as const satisfies RelationProperty
