import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type CurrencyKey = Slug

export const currencyKey = {
  id: "01a0675a-f185-7f59-addb-d7ce1343c8c9",
  pageTypeSlug: "relation-property",
  slug: "currency-key",
  propertySlug: "currency-key",
  definition: "the currency an amount is held in",
  targetPageTypeSlug: "page-type/temper-inventory-currency",
} as const satisfies RelationProperty
