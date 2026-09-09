import type { TextProperty } from "@akasha/pages/text-property"

export type TargetType = string

export const targetType = {
  id: "01a06193-6ca3-7704-a255-d95d6a44eeb5",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "target-type",
  propertySlug: "target-type",
  definition: "whose number a test reads",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
