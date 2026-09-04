import type { TextProperty } from "@akasha/pages-system/text-property"

export type SetClassId = string

export const setClassId = {
  id: "01a05fd1-d43e-7ece-af53-4be28ed6067d",
  pageTypeSlug: "text-property",
  slug: "set-class-id",
  propertySlug: "class-id",
  definition: "the class a set is only offered to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a class." }],
} as const satisfies TextProperty
