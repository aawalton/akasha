import type { TextProperty } from "@akasha/pages-system/text-property"

export type CompletionCardId = string

export const completionCardId = {
  id: "01a05fc6-81fb-7893-8ba7-9e582c0fd637",
  pageTypeSlug: "text-property",
  slug: "completion-card-id",
  propertySlug: "completion-card-id",
  definition: "the completion card a page counts toward",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a completion card." },
  ],
} as const satisfies TextProperty
