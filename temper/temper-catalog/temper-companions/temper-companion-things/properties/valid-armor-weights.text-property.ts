import type { TextProperty } from "@akasha/pages-system/text-property"

export type ValidArmorWeights = string

export const validArmorWeights = {
  id: "01a05fce-1853-7880-bba6-4f23630e1dbf",
  pageTypeSlug: "text-property",
  slug: "valid-armor-weights",
  propertySlug: "valid-armor-weights",
  definition: "an armor weight a role is built around",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
