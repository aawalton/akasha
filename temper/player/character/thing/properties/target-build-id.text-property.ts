import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const targetBuildId = {
  id: "01a05fcd-f546-7645-8222-b9d3112c35d8",
  type: "page-type/text-property",
  slug: "target-build-id",
  propertySlug: "target-build-id",
  definition: "the build a character is working towards",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  types: "ts",
  createdAt: "2026-09-02T01:48:48.326Z",
  updatedAt: "2026-09-21T15:29:06.000Z",
} as const satisfies TextProperty
