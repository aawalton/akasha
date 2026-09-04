import type { TextProperty } from "@akasha/pages-system/text-property"

export type BaseName = string

export const baseName = {
  id: "01a05fca-cb81-77df-9bb1-c81f1135aeb9",
  pageTypeSlug: "text-property",
  slug: "base-name",
  propertySlug: "base-name",
  definition: "the name a skill's morphs are gathered under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
