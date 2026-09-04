import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const useDestinationResolver = {
  id: "01a060d9-44ce-740b-8902-a0d1541b3f6e",
  pageTypeSlug: "module",
  slug: "use-destination-resolver",
  definition: "which character an item worth learning goes to, given who already knows the item",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character already knowing the item is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A character already claiming the item is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A consumable carries no claim.",
    },
    {
      invariantKind: "departure",
      statement: "One character may take more than one consumable.",
    },
    {
      invariantKind: "departure",
      statement: "A master motif goes to the character knowing the fewest chapters of that style.",
    },
    {
      invariantKind: "departure",
      statement: "Characters tying on known chapters keep the order the character priority gave.",
    },
  ],
} as const satisfies Module
