import type { TextProperty } from "@akasha/pages-system/text-property"

export type AntiquityName = string

export const antiquityName = {
  id: "01a06166-503b-7002-add8-4c470a5fd43d",
  pageTypeSlug: "text-property",
  slug: "antiquity-name",
  propertySlug: "antiquity-name",
  definition: "the name an antiquity is shown under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
