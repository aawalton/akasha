import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperTradingPost = {
  id: "01a060a9-5d59-7bb9-b2e0-af4c90fe867f",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-trading-post",
  definition: "putting an item up for sale at a guild store",
  parts: ["module/guild-store-poster"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One post is in flight at a time.",
    },
    {
      invariantKind: "departure",
      statement: "An item outside the backpack is never posted.",
    },
  ],
} as const satisfies Domain
