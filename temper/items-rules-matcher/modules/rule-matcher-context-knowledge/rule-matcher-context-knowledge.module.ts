import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleMatcherContextKnowledge = {
  id: "01a06281-4830-7a5f-998e-b9cc4662de7e",
  type: "module",
  slug: "rule-matcher-context-knowledge",
  definition: "what each character knows and what the account has of what they want",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A list the game wrote sparsely and one it wrote as a record say the same thing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A recipe is known where the game says known, and the rest are left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the crafting motif category of the lore library counts as motif knowledge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every character holds a motif chapter map, empty where the game wrote none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A trait a character has yet to research is recorded as unknown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Bank stock is what the Bank location holds and nothing else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a location keyed by digits alone counts as a character for stock.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A script is recorded by the item id its name resolves to.",
    },
  ],
} as const satisfies Module
