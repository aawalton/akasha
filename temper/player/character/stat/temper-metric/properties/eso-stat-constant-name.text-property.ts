import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoStatConstantName = {
  id: "01a0de62-56cf-765f-91b6-0557fe39653d",
  type: "page-type/text-property",
  slug: "eso-stat-constant-name",
  propertySlug: "eso-stat-constant-name",
  definition: "the constant The Elder Scrolls Online names a stat by in its own code",
  maxLength: 200,
  nameFormat: "name-format/upper-snake-case",
  types: "ts",
  createdAt: "2026-09-26T15:43:01.839Z",
  updatedAt: "2026-09-26T15:43:08.000Z",
} as const satisfies TextProperty
