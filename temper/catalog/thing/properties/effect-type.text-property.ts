import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const effectType = {
  id: "01a05fb0-3cec-7336-a2af-ef2657a47e86",
  type: "page-type/text-property",
  slug: "effect-type",
  propertySlug: "type",
  definition: "how an effect's value is read against the metric the effect moves",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T01:16:20.588Z",
  updatedAt: "2026-09-15T17:21:40.000Z",
} as const satisfies TextProperty
