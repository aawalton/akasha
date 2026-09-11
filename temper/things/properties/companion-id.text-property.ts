import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const companionId = {
  id: "01a05fba-ce39-74ad-926f-d6a5d9908dfc",
  type: "text-property",
  slug: "companion-id",
  propertySlug: "companion-id",
  definition: "the companion a page is about",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to  a companion." }],
  types: "ts",
} as const satisfies TextProperty
