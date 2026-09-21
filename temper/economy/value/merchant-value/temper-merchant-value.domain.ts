import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperMerchantValue = {
  id: "01a0b761-57b4-74bc-8bbd-d082f1b7bbf1",
  type: "page-type/domain",
  slug: "temper-merchant-value",
  definition: "what a merchant in the game pays for a thing",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A merchant value is the game's own price, with every bonus the character carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every thing a merchant takes has a merchant value.",
    },
  ],
} as const satisfies Domain
