import type { TextProperty } from "@akasha/pages/text-property"

export type CoefficientType = string

export const coefficientType = {
  id: "01a06193-6ca4-7cdd-b848-4ff0537c6bf1",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "coefficient-type",
  propertySlug: "coefficient-type",
  definition: "how often a coefficient counts against the metric it reads",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
