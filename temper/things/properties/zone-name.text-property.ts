import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const zoneName = {
  id: "01a05fcd-f557-7382-a41e-b179ecebe6e0",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "zone-name",
  propertySlug: "zone-name",
  definition: "what a zone is called",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
