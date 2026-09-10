import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setSelectHelpers = {
  id: "01a061a4-18b1-76bb-93ce-10eaed820121",
  pageTypeSlug: "module",
  slug: "set-select-helpers",
  definition:
    "the gear set picker's own list of choices, grouped by category and searchable by name",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The no-set choice is the first choice the picker offers.",
    },
  ],
} as const satisfies Module
