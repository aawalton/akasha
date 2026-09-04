import type { TextProperty } from "@akasha/pages-system/text-property"

export type DebuffName = string

export const debuffName = {
  id: "01a06193-6ca5-7924-8fb4-639028413f96",
  pageTypeSlug: "text-property",
  slug: "debuff-name",
  propertySlug: "debuff",
  definition: "the harmful effect an effect puts on whoever it lands on",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
