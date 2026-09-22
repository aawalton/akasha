import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const charEligibility = {
  id: "01a07283-f298-7cad-8c9f-82f3ca167ff1",
  type: "page-type/text-property",
  slug: "char-eligibility",
  propertySlug: "char-eligibility",
  definition: "which characters a leg of a destination chain will send an item to",
  maxLength: 500,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A leg stating nothing here sends to every character the leg reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A leg's test of a character is no test an item condition makes.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The test is written here as text whatever shape the test has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A character test is a field of its own as an item test is.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
