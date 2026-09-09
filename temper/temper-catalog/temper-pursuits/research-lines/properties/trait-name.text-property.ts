import type { TextProperty } from "@akasha/pages/text-property"

export type TraitName = string

export const traitName = {
  id: "01a0616b-2cdf-7003-9ab6-582d883b8161",
  pageTypeSlug: "text-property",
  slug: "trait-name",
  propertySlug: "trait-name",
  definition: "the name a researchable trait is shown under",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
