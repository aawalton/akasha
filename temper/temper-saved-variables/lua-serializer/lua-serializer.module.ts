import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const luaSerializer = {
  id: "01a06053-3635-7645-b6ba-ffae9f98d01e",
  pageTypeSlug: "module",
  slug: "lua-serializer",
  definition: "one keyed entry of a Lua table written out as the lines of a file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Indentation grows by four spaces at each level.",
    },
    {
      invariantKind: "departure",
      statement: "A key of digits alone is written in brackets unquoted.",
    },
    {
      invariantKind: "departure",
      statement: "An empty table is written as a pair of braces on one line.",
    },
    {
      invariantKind: "constraint",
      statement: "Escaping reaches the backslash and the quote and the newline alone.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is null or undefined is written as `nil`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
