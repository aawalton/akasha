import type { Module } from "@akasha/code-system/module"

export const asyncLuaTruthy = {
  id: "01a0606a-1c55-7be8-906d-f6520a9cb651",
  pageTypeSlug: "module",
  slug: "async-lua-truthy",
  definition: "whether Lua would read a value as true",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only nil and false are false in Lua.",
    },
    {
      invariantKind: "departure",
      statement: "Zero and the empty string are true.",
    },
  ],
} as const satisfies Module
