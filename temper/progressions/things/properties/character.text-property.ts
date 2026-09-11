import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const character = {
  id: "01a05fc6-81fb-7d2b-9860-e72705b8dd8f",
  type: "text-property",
  slug: "character",
  propertySlug: "character",
  definition: "the character a page is about",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a character." }],
  types: "ts",
} as const satisfies TextProperty
