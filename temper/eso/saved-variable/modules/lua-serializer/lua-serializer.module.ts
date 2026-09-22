import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const luaSerializer = {
  id: "01a06053-3635-7645-b6ba-ffae9f98d01e",
  type: "page-type/module",
  slug: "lua-serializer",
  definition: "a keyed entry of a Lua table written out as the lines of a file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Indentation grows by four spaces at each level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key of digits alone is written in brackets unquoted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty table is written as a pair of braces on one line.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Escaping reaches the backslash and the quote and the newline alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is null or undefined is written as `nil`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
