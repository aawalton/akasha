import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Effect = string

export const effect = {
  id: "01a05fb0-3ceb-76f9-a671-f1a905b3e99c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "effect",
  propertySlug: "effect",
  definition: "what a thing does, said as the game says it",
  maxLength: 500,
  nameFormat: null,
} as const satisfies TextProperty
