import type { TextProperty } from "@akasha/pages/text-property"

export type TraitId = string

export const traitId = {
  id: "01a05fd1-d43e-71b5-b24b-b39383044c71",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "trait-id",
  propertySlug: "trait-id",
  definition: "the trait a number the game has answers to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a trait." }],
} as const satisfies TextProperty
