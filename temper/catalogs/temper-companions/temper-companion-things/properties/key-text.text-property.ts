import type { TextProperty } from "@akasha/pages/text-property"

export type KeyText = string

export const keyText = {
  id: "01a05fcf-246a-7159-98cc-c6c0ba7abf32",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "key-text",
  propertySlug: "key-text",
  definition: "the name the game spells a constant by",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
