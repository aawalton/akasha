import type { TextProperty } from "@akasha/pages-system/text-property"

export type EffectiveCharacter = string

export const effectiveCharacter = {
  id: "01a05fd3-435d-7270-818b-8846a738e4c8",
  pageTypeSlug: "text-property",
  slug: "effective-character",
  propertySlug: "effective-character",
  definition: "the character a rotating task falls to for its current turn",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a character." }],
} as const satisfies TextProperty
