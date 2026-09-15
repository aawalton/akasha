import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const effectiveCharacter = {
  id: "01a05fd3-435d-7270-818b-8846a738e4c8",
  type: "text-property",
  slug: "effective-character",
  propertySlug: "effective-character",
  definition: "the character a rotating task falls to for its current turn",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "invariant-kind/gap",
      statement: "This property is a relation to a character.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
