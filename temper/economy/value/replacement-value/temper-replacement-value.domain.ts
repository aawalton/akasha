import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperReplacementValue = {
  id: "01a0b761-76a7-78cd-82a0-bfa7fa48f3b4",
  type: "page-type/domain",
  slug: "temper-replacement-value",
  definition: "what a player would pay to get another of a thing",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing has a replacement value whether or not a player can be sold that thing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A replacement value answers how hard a thing is to buy rather than what one sold for.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A replacement value is worked out exactly as a market value is.",
    },
  ],
} as const satisfies Domain
