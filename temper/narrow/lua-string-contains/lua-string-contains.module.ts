import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const luaStringContains = {
  id: "01a08e17-f876-773e-b52a-6d8f314fa4fa",
  type: "module",
  slug: "lua-string-contains",
  definition: "whether one text holds another somewhere inside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The text looked for is matched as plain text rather than as a Lua pattern.",
    },
  ],
} as const satisfies Module
