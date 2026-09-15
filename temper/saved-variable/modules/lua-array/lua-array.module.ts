import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const luaArray = {
  id: "01a06053-3636-7157-ade2-a72c0d19b41c",
  type: "page-type/module",
  slug: "lua-array",
  definition: "reading a Lua list the file may have written keyed or unkeyed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A record put in place of a list keeps the order its keys were written in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item's key goes at the head of the path an error names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One item failing fails the whole list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is neither a list nor a record reads as an empty list.",
    },
  ],
} as const satisfies Module
