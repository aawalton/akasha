import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const coefficientType = {
  id: "01a06193-6ca4-7cdd-b848-4ff0537c6bf1",
  type: "text-property",
  slug: "coefficient-type",
  propertySlug: "coefficient-type",
  definition: "how often a coefficient counts against the metric it reads",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
