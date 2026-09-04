import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setSource = {
  id: "01a061a4-18b1-7a6e-bc9b-94150a72e67b",
  pageTypeSlug: "module",
  slug: "set-source",
  definition:
    "one effect source per gear set and piece count, scaled by the quality of the pieces worn",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A source holds the bonuses whose piece count the worn count reaches.",
    },
  ],
} as const satisfies Module
