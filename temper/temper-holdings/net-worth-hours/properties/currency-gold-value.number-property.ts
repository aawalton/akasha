import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CurrencyGoldValue = number

export const currencyGoldValue = {
  id: "01a06006-154c-7c0e-a5e5-e12741aab64d",
  pageTypeSlug: "number-property",
  slug: "currency-gold-value",
  propertySlug: "currency-gold-value",
  definition: "what the money an account holds is worth in gold",
  max: null,
} as const satisfies NumberProperty
