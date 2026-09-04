import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchStringArrayParse = {
  id: "01a0613a-e0af-7002-b311-310a410d8013",
  pageTypeSlug: "module",
  slug: "search-string-array-parse",
  definition: "a list of strings read out of whatever a saved search or an editor handed in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value that is no array is read as no value.",
    },
    {
      invariantKind: "departure",
      statement: "An array holding a non-string entry is read as no value.",
    },
  ],
} as const satisfies Module
