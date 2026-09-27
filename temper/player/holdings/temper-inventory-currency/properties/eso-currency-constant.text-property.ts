import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoCurrencyConstant = {
  id: "01a0e0d4-8faf-700d-9f8f-9813db2ff760",
  type: "page-type/text-property",
  slug: "eso-currency-constant",
  propertySlug: "eso-currency-constant",
  definition: "the name of the constant the game numbers a currency by",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
