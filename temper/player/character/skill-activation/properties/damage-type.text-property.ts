import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const damageType = {
  id: "01a05fcd-f549-776e-8c14-650e3911df93",
  type: "page-type/text-property",
  slug: "damage-type",
  propertySlug: "damage-type",
  definition: "the flavour of damage an effect deals",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T01:48:48.329Z",
  updatedAt: "2026-09-21T15:29:06.000Z",
} as const satisfies TextProperty
