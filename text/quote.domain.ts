import type { Domain } from "../domains/domains/domain.page-type.ts"

export const quote = {
  id: "01a06815-ceaf-7d64-bb5e-3b8a0ff93c0f",
  pageTypeSlug: "domain",
  slug: "quote",
  definition: "a link whose text sits in the document it names",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quote's text is written in quotation marks.",
    },
    {
      invariantKind: "departure",
      statement: "A quote matches any part of the document's text rather than a whole entry.",
    },
  ],
} as const satisfies Domain
