import type { TextProperty } from "@akasha/pages-system/text-property"

export type Parent = string

export const parent = {
  id: "01a05fba-ce39-70e6-a46f-4b11e5d2a508",
  pageTypeSlug: "text-property",
  slug: "parent",
  propertySlug: "parent",
  definition: "the page a page hangs beneath",
  max: 200,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to  the page above." },
  ],
} as const satisfies TextProperty
