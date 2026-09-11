import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const buffId = {
  id: "01a05fcc-41f1-7e7a-abd6-c8c6650999ad",
  type: "text-property",
  slug: "buff-id",
  propertySlug: "buff-id",
  definition: "the helpful effect a thing puts on whoever uses it",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a buff." }],
  types: "ts",
} as const satisfies TextProperty
