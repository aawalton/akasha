import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const eligibilityPredicateComposer = {
  id: "01a06100-3beb-7c1f-82cd-d52265a07bd5",
  type: "module",
  slug: "eligibility-predicate-composer",
  definition:
    "one test of whether a character suits a rule, made from every character condition it has",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character failing one condition fails the whole test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A condition whose reader the context lacks is passed over.",
    },
  ],
} as const satisfies Module
