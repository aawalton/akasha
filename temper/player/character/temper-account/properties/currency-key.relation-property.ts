import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const currencyKey = {
  id: "01a0675a-f185-7f59-addb-d7ce1343c8c9",
  type: "page-type/relation-property",
  slug: "currency-key",
  propertySlug: "currency-key",
  definition: "an amount's currency",
  targetPageType: "page-type/temper-inventory-currency",
  types: "ts",
} as const satisfies RelationProperty
