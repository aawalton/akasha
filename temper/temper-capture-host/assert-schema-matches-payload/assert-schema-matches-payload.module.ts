import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const assertSchemaMatchesPayload = {
  id: "01a06075-b052-7e77-979b-c9bea93f7ba3",
  pageTypeSlug: "module",
  slug: "assert-schema-matches-payload",
  definition: "a call refusing to typecheck unless a zod schema infers exactly a payload type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Exact sameness is tested rather than assignability.",
    },
    {
      invariantKind: "departure",
      statement: "The call does nothing at runtime.",
    },
    {
      invariantKind: "departure",
      statement: "A mismatch reads as an argument the caller left out.",
    },
  ],
} as const satisfies Module
