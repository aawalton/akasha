import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionGearShoppingBridge = {
  id: "01a060cf-b0b2-743e-9d82-ea94a110b9cb",
  type: "page-type/module",
  slug: "companion-gear-shopping-bridge",
  definition: "a piece of companion gear a build wants turned into a search",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The gear a build wants is stated here as the fields this module reads.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Where a gear need is worked out is a package akasha has yet to hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Four fields of a need together make the key one recommendation comes back under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A need Tamriel Trade Centre knows no item for answers with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Armour narrows a search by weight where jewellery and a weapon do not.",
    },
  ],
} as const satisfies Module
