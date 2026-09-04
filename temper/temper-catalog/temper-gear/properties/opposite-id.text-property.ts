import type { TextProperty } from "@akasha/pages-system/text-property"

export type OppositeId = string

export const oppositeId = {
  id: "01a05fd1-d43d-7ade-8dad-6cb14825b926",
  pageTypeSlug: "text-property",
  slug: "opposite-id",
  propertySlug: "opposite-id",
  definition: "the alchemy effect undoing what this one does",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a poison effect." },
  ],
} as const satisfies TextProperty
