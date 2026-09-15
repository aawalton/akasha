import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const firstCapture = {
  id: "01a08dfe-6a6f-7a00-8441-fb9ea0f7d5d9",
  type: "module",
  slug: "first-capture",
  definition: "the first group a pattern took from text, or nothing",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text the pattern did not match at all is nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A match whose first group took part in nothing is nothing rather than an error.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty first group is answered rather than read as nothing.",
    },
  ],
} as const satisfies Module
