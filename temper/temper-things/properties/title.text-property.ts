import type { TextProperty } from "@akasha/pages-system/text-property"

export type Title = string

export const title = {
  id: "01a05fac-7582-7694-ae1f-480fe66ea27b",
  pageTypeSlug: "text-property",
  slug: "title",
  propertySlug: "title",
  definition: "the name a thing is shown under",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A title is written as the name is written rather than as a slug is written.",
    },
  ],
} as const satisfies TextProperty
