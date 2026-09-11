import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const isTable = {
  id: "01a08e01-6b05-7023-a79d-f39cedee5996",
  type: "module",
  slug: "is-table",
  definition: "whether a value the game handed over is a Lua table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only Lua's own `type` tells a table from userdata.",
    },
  ],
} as const satisfies Module
