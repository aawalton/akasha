import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const liveBuildId = {
  id: "01a05fcd-f545-7d48-9dcc-6dc427e56e01",
  type: "page-type/text-property",
  slug: "live-build-id",
  propertySlug: "live-build-id",
  definition: "the build a character is wearing right now",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  types: "ts",
  createdAt: "2026-09-02T01:48:48.325Z",
  updatedAt: "2026-09-21T15:29:06.000Z",
} as const satisfies TextProperty
