import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperValue = {
  id: "01a0b760-9c78-7f15-bcd1-231796bec651",
  type: "page-type/domain",
  slug: "temper-value",
  definition: "what a thing a player holds is worth",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing has a market value, a merchant value and a replacement value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One name reaches a kind of value in the capture, in an item's facts and in a rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind of value a reading cannot answer is absent rather than zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value of a thing with no kind named is the largest of the three.",
    },
  ],
} as const satisfies Domain
