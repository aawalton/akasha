import type { TextProperty } from "@akasha/pages-system/text-property"

export type Day = string

export const day = {
  id: "01a05fe1-6afe-7e3c-bea8-7139e87554c8",
  pageTypeSlug: "text-property",
  slug: "day",
  propertySlug: "day",
  definition: "the calendar day a page gathers",
  max: 10,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day is written as an ISO 8601 calendar day.",
    },
    {
      invariantKind: "departure",
      statement: "A day is read in UTC rather than in the time zone Alan was in.",
    },
  ],
} as const satisfies TextProperty
