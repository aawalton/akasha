import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Subtitle = string

export const subtitle = {
  id: "01a05fcf-2467-75a6-9b17-83afd352a723",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "subtitle",
  propertySlug: "subtitle",
  definition: "the epithet a companion is known by",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
