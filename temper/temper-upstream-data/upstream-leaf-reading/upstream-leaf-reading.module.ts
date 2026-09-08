import type { Module } from "@akasha/code/module"

export const upstreamLeafReading = {
  id: "01a06282-dfc3-722f-9afd-a38cf3034d7a",
  pageTypeSlug: "module",
  slug: "upstream-leaf-reading",
  definition: "the leaves read off an upstream table and ruled against the leaves of the port",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A table still inside Lua is walked inside Lua.",
    },
    {
      invariantKind: "departure",
      statement: "A table already carried out of Lua is walked as a TypeScript value.",
    },
    {
      invariantKind: "constraint",
      statement: "A table with a sequence is carried out of Lua before that table is walked.",
    },
    {
      invariantKind: "departure",
      statement: "An upstream dump with no leaf beside a ported dump with no leaf is refused.",
    },

    {
      invariantKind: "departure",
      statement: "The rulings of a library's datasets gather into one ruling for that library.",
    },
  ],
} as const satisfies Module
