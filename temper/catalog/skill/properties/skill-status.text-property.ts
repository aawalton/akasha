import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const skillStatus = {
  id: "01a05fca-cb87-719f-b348-33ad77e63005",
  type: "page-type/text-property",
  slug: "skill-status",
  propertySlug: "status",
  definition: "how far temper works out what a skill does",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T01:45:21.031Z",
  updatedAt: "2026-09-21T15:29:38.000Z",
} as const satisfies TextProperty
