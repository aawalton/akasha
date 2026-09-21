import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const currencyScope = {
  id: "01a0675a-f185-7129-990f-a2084aecc2dc",
  type: "page-type/text-property",
  slug: "currency-scope",
  propertySlug: "scope",
  definition: "how widely a purse reaches across an account",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
