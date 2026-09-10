import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type AntiquityName = string

export const antiquityName = {
  id: "01a06166-503b-7002-add8-4c470a5fd43d",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "antiquity-name",
  propertySlug: "antiquity-name",
  definition: "the name an antiquity is shown under",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
