import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const evaluator = {
  id: "01a06137-f96c-78f9-8a21-1e325a4be527",
  type: "module",
  slug: "evaluator",
  definition: "the first-match run of an ordered compiled rule list against one item's facts",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a stock rule's result carries a target quantity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A target quantity the destination resolved takes the rule's own place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The outcome's label states the target quantity the outcome carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Category then conditions then platform block then destination are checked in that order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A container is rejected for the fence-launder and fence-sell actions.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stolen container is rejected for the sell action.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The full run evaluates every rule even after the first match is found.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The outcome-only run stops at the first match, and reaches the outcome the full run reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule's result names the rule the result is of.",
    },
  ],
} as const satisfies Module
