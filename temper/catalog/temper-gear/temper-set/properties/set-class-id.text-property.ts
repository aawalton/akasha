import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const setClassId = {
  id: "01a05fd1-d43e-7ece-af53-4be28ed6067d",
  type: "page-type/text-property",
  slug: "set-class-id",
  propertySlug: "class-id",
  definition: "the class a set is only offered to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "invariant-kind/gap", statement: "This property is a relation to a class." },
  ],
  types: "ts",
} as const satisfies TextProperty
