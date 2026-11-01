import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchStringArrayParse = {
  id: "01a0613a-e0af-7002-b311-310a410d8013",
  type: "page-type/module",
  slug: "search-string-array-parse",
  definition: "a list of strings read out of whatever a saved search or an editor handed in",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is no array is read as no value, unless read as one-or-many.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Read as one-or-many, a single string or number is a list of that one string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An array with a non-string entry is read as no value.",
    },
  ],
  createdAt: "2026-09-02T08:27:23.695Z",
  updatedAt: "2026-11-01T21:28:40.921Z",
} as const satisfies Module
