import type { TextProperty } from "@akasha/pages/text-property"

export type FormulaKind = string

export const formulaKind = {
  id: "01a06193-6c9e-76cf-becf-954a806b18e9",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "formula-kind",
  propertySlug: "type",
  definition: "how an effect works out the number it has",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
