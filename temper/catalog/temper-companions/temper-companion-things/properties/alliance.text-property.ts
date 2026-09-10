import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Alliance = string

export const alliance = {
  id: "01a05fcf-2468-7229-a1a7-015a775866de",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "alliance",
  propertySlug: "alliance",
  definition: "the alliance a companion belongs to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
