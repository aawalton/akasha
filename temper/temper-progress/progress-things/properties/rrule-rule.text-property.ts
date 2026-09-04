import type { TextProperty } from "@akasha/pages-system/text-property"

export type RruleRule = string

export const rruleRule = {
  id: "01a05fc6-81fd-7f0e-82af-5f52794a8b51",
  pageTypeSlug: "text-property",
  slug: "rrule-rule",
  propertySlug: "rrule-rule",
  definition: "how often a task comes round again",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A recurrence is written as an RFC 5545 RRULE without its `RRULE:` opener.",
    },
  ],
} as const satisfies TextProperty
