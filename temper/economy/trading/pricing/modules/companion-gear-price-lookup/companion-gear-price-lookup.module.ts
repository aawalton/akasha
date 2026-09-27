import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionGearPriceLookup = {
  id: "01a060bf-747d-70fa-9173-c60bb80e0400",
  type: "page-type/module",
  slug: "companion-gear-price-lookup",
  definition: "what a piece of companion equipment of a given trait and quality costs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The numbers Tamriel Trade Centre files companion gear under are read from the companion pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece of armor is found by the place it is worn and the weight it is made at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking before those pages are read is refused rather than answered empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen can tell the numbers held now from the ones it last worked from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An equipment slot Tamriel Trade Centre prices no item for answers with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An average over the market weighs each entry by the sale count that entry has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry no sale backs is left out of the average.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A price is read from the level Tamriel Trade Centre files companion equipment under.",
    },
  ],
} as const satisfies Module
