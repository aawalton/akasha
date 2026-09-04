import type { TextProperty } from "@akasha/pages-system/text-property"

export type Resource = string

export const resource = {
  id: "01a06193-6ca1-7202-9bb6-3c173c8c26d5",
  pageTypeSlug: "text-property",
  slug: "resource",
  propertySlug: "resource",
  definition: "the pool a companion spends to cast",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
