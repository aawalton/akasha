import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const textPattern = {
  id: "01a155a1-bc4b-74f4-98e5-d57acd2c60a3",
  type: "page-type/module",
  slug: "text-pattern",
  definition: "a pattern finding the numbers a game text holds, without regular expressions",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern is literal text with tokens, read with case ignored.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`<n>` is a whole number and `<d>` a number with a decimal point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "`<w>` is one word, `<*>` the shortest run of anything and `<b>` the end of a word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "`[...]` is optional and `{a|b|}` takes the first option that lets the rest match.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each number a pattern finds is kept under its place among the pattern's numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The same code runs in Bun and in the add-on's Lua.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The Lua the add-on is compiled to has no regular expressions.",
    },
  ],
  createdAt: "2026-10-19T19:27:05.290Z",
  updatedAt: "2026-10-19T19:27:05.290Z",
} as const satisfies Module
