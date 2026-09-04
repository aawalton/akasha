import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionGearPriceLookup = {
  id: "01a060bf-747d-70fa-9173-c60bb80e0400",
  pageTypeSlug: "module",
  slug: "companion-gear-price-lookup",
  definition: "what a piece of companion equipment of a given trait and quality costs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An equipment slot Tamriel Trade Centre prices no item for answers with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An average over the market weighs each entry by the sale count that entry holds.",
    },
    {
      invariantKind: "departure",
      statement: "An entry no sale backs is left out of the average.",
    },
    {
      invariantKind: "departure",
      statement:
        "A price is read from the level Tamriel Trade Centre files companion equipment under.",
    },
  ],
} as const satisfies Module
