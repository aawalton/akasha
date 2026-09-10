import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type CurrencyScope = string

export const currencyScope = {
  id: "01a0675a-f185-7129-990f-a2084aecc2dc",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "currency-scope",
  propertySlug: "scope",
  definition: "how widely a purse reaches across an account",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
