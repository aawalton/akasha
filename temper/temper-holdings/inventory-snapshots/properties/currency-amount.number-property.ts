import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CurrencyAmount = number

export const currencyAmount = {
  id: "01a0675a-f185-7ae5-81fe-f486e2db8460",
  pageTypeSlug: "number-property",
  slug: "currency-amount",
  propertySlug: "amount",
  definition: "how much of a currency is held",
  max: null,
} as const satisfies NumberProperty
