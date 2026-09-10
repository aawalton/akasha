import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCardId = {
  id: "01a06103-061b-7c11-a311-6a30a8548331",
  pageTypeSlug: "module",
  slug: "completion-card-id",
  definition: "the identity of a completion card, counting the five that only a daily task names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Five task identifiers are named here that the category tree never holds.",
    },
  ],
} as const satisfies Module
