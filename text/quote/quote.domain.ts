import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const quote = {
  id: "01a06815-ceaf-7d64-bb5e-3b8a0ff93c0f",
  type: "page-type/domain",
  slug: "quote",
  definition: "a link whose text sits in the document it names",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "quotes" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quote's text is written in quotation marks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quote matches any part of the document's text rather than a whole entry.",
    },
  ],
} as const satisfies Domain
