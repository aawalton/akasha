import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const resource = {
  id: "01a06193-6ca1-7202-9bb6-3c173c8c26d5",
  type: "text-property",
  slug: "resource",
  propertySlug: "resource",
  definition: "the pool a companion spends to cast",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
