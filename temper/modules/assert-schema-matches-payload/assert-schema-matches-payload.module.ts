import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const assertSchemaMatchesPayload = {
  id: "01a06075-b052-7e77-979b-c9bea93f7ba3",
  type: "page-type/module",
  slug: "assert-schema-matches-payload",
  definition: "a call refusing to typecheck unless a zod schema infers exactly a payload type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The check here runs in the type system rather than at runtime.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Exact sameness is tested rather than assignability.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mismatch reads as an argument the caller left out.",
    },
  ],
} as const satisfies Module
