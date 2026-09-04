import type { TextProperty } from "@akasha/pages-system/text-property"

export type TargetBuildId = string

export const targetBuildId = {
  id: "01a05fcd-f546-7645-8222-b9d3112c35d8",
  pageTypeSlug: "text-property",
  slug: "target-build-id",
  propertySlug: "target-build-id",
  definition: "the build a character is working towards",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
} as const satisfies TextProperty
