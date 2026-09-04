import type { TextProperty } from "@akasha/pages-system/text-property"

export type TargetType = string

export const targetType = {
  id: "01a06193-6ca3-7704-a255-d95d6a44eeb5",
  pageTypeSlug: "text-property",
  slug: "target-type",
  propertySlug: "target-type",
  definition: "whose number a test reads",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
