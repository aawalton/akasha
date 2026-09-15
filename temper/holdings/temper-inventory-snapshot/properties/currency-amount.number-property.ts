import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const currencyAmount = {
  id: "01a0675a-f185-7ae5-81fe-f486e2db8460",
  type: "page-type/number-property",
  slug: "currency-amount",
  propertySlug: "amount",
  definition: "how much of a currency is held",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
