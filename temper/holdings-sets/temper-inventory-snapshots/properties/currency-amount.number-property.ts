import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const currencyAmount = {
  id: "01a0675a-f185-7ae5-81fe-f486e2db8460",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "currency-amount",
  propertySlug: "amount",
  definition: "how much of a currency is held",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
