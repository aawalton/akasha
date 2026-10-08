import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const currencyKey = {
  id: "01a0675a-f185-7f59-addb-d7ce1343c8c9",
  type: "page-type/relation-property",
  slug: "currency-key",
  propertySlug: "currency-key",
  definition: "an amount's currency",
  targetPageType: "page-type/temper-inventory-currency",
  types: "ts",
  createdAt: "2026-09-03T13:00:08.453Z",
  updatedAt: "2026-09-22T14:05:53.000Z",
} as const satisfies RelationProperty
