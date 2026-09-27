import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const buyMaxPrice = {
  id: "01a0e345-0f0b-7d1f-bd85-d7046eb8986c",
  type: "page-type/number-property",
  slug: "buy-max-price",
  propertySlug: "buy-max-price",
  definition: "the most gold a rule buying its shortfall pays for one of an item",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule buys no item priced above this for one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule stating no price pays what a merchant asks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule stating no price pays at most TTC's suggested price at a guild store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule stating no price buys nothing at a guild store for an item TTC suggests no price for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A price of zero states no price.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
