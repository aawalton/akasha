import type { TextProperty } from "@akasha/pages/text-property"

export type ValidTraitIds = string

export const validTraitIds = {
  id: "01a05fce-1853-7aad-97fd-8d8e8e51af86",
  pageTypeSlug: "text-property",
  slug: "valid-trait-ids",
  propertySlug: "valid-trait-ids",
  definition: "a trait a role is built around",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
