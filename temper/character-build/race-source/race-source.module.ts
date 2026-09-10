import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const raceSource = {
  id: "01a061a7-9bb3-769a-973c-5b550c916d32",
  pageTypeSlug: "module",
  slug: "race-source",
  definition: "every playable race a character build offers, with the empty choice first",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The empty choice is first among the race sources.",
    },
  ],
} as const satisfies Module
