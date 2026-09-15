import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchStringArrayParse = {
  id: "01a0613a-e0af-7002-b311-310a410d8013",
  type: "module",
  slug: "search-string-array-parse",
  definition: "a list of strings read out of whatever a saved search or an editor handed in",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value that is no array is read as no value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An array with a non-string entry is read as no value.",
    },
  ],
} as const satisfies Module
