import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type TargetBuildId = string

export const targetBuildId = {
  id: "01a05fcd-f546-7645-8222-b9d3112c35d8",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "target-build-id",
  propertySlug: "target-build-id",
  definition: "the build a character is working towards",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
} as const satisfies TextProperty
