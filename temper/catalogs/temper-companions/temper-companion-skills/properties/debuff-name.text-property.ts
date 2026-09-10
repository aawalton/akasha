import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DebuffName = string

export const debuffName = {
  id: "01a06193-6ca5-7924-8fb4-639028413f96",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "debuff-name",
  propertySlug: "debuff",
  definition: "the harmful effect an effect puts on whoever it lands on",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
