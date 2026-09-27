import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useDestinationResolver = {
  id: "01a060d9-44ce-740b-8902-a0d1541b3f6e",
  type: "page-type/module",
  slug: "use-destination-resolver",
  definition: "which character an item worth learning goes to, given who already knows the item",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "N copies held anywhere go to the first N characters in priority lacking the item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character among those N holding a copy takes her own copy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy in storage goes to one of those N before a character's spare copy does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A copy beyond the characters lacking the item goes to no character.",
    },
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
