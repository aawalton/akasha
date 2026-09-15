import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useDestinationResolver = {
  id: "01a060d9-44ce-740b-8902-a0d1541b3f6e",
  type: "page-type/module",
  slug: "use-destination-resolver",
  definition: "which character an item worth learning goes to, given who already knows the item",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character already knowing the item is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character already claiming the item is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A consumable has no claim.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One character may take several consumables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A master motif goes to the character knowing the fewest chapters of that style.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Characters tying on known chapters keep the order the character priority gave.",
    },
  ],
} as const satisfies Module
