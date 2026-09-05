import type { TextProperty } from "@akasha/pages/text-property"

export type CharEligibility = string

export const charEligibility = {
  id: "01a07283-f298-7cad-8c9f-82f3ca167ff1",
  pageTypeSlug: "text-property",
  slug: "char-eligibility",
  propertySlug: "char-eligibility",
  definition: "which characters one leg of a destination chain will send an item to",
  max: 500,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A leg stating nothing here sends to every character the leg reaches.",
    },
    {
      invariantKind: "departure",
      statement: "What a leg tests of a character is no test an item condition makes.",
    },
    {
      invariantKind: "stopgap",
      statement: "The test is written here as text whatever shape the test has.",
    },
    {
      invariantKind: "gap",
      statement: "A character test is a field of its own as an item test is.",
    },
  ],
} as const satisfies TextProperty
