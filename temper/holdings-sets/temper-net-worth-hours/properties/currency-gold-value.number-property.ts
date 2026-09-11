import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const currencyGoldValue = {
  id: "01a06006-154c-7c0e-a5e5-e12741aab64d",
  type: "number-property",
  slug: "currency-gold-value",
  propertySlug: "currency-gold-value",
  definition: "what the money an account has is worth in gold",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
