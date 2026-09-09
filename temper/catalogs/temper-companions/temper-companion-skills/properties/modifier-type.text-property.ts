import type { TextProperty } from "@akasha/pages/text-property"

export type ModifierType = string

export const modifierType = {
  id: "01a06193-6ca0-7c8c-b487-311d4883f9b6",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "modifier-type",
  propertySlug: "modifier-type",
  definition: "whether a passive's value counts as a fraction or as a whole number",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
