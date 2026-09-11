import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const parent = {
  id: "01a05fba-ce39-70e6-a46f-4b11e5d2a508",
  type: "text-property",
  slug: "parent",
  propertySlug: "parent",
  definition: "the page a page hangs beneath",
  maxLength: 200,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to  the page above." },
  ],
  types: "ts",
} as const satisfies TextProperty
