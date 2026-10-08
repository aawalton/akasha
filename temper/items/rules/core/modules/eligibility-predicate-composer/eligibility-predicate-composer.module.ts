import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const eligibilityPredicateComposer = {
  id: "01a06100-3beb-7c1f-82cd-d52265a07bd5",
  type: "page-type/module",
  slug: "eligibility-predicate-composer",
  definition:
    "a test of whether a character suits a rule, made from every character condition it has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character failing one condition fails the whole test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A condition whose reader the context lacks is passed over.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.427Z",
  updatedAt: "2026-09-22T10:09:16.000Z",
} as const satisfies Module
