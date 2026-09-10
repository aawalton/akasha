import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ClassPassiveId = string

export const classPassiveId = {
  id: "01a05fcf-2468-7692-a8d7-4ab20e4f20c6",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "class-passive-id",
  propertySlug: "class-passive-id",
  definition: "the passive a companion's class grants",
  maxLength: 200,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
