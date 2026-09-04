import type { TextProperty } from "@akasha/pages-system/text-property"

export type Priority = string

export const priority = {
  id: "01a05fc6-81fd-7764-b99b-b35b9b100540",
  pageTypeSlug: "text-property",
  slug: "priority",
  propertySlug: "priority",
  definition: "how soon a task is wanted against its siblings",
  max: 4,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "departure", statement: "A priority is written `p` before its number." },
    { invariantKind: "departure", statement: "A lower number is wanted sooner." },
  ],
} as const satisfies TextProperty
