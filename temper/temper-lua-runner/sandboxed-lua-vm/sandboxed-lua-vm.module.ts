import type { Module } from "@akasha/code-system/module"

export const sandboxedLuaVm = {
  id: "01a06059-2493-7f9b-a205-1e78ff949f76",
  pageTypeSlug: "module",
  slug: "sandboxed-lua-vm",
  definition: "a Lua VM whose globals answer as the game's globals would",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The prelude is loaded from the file beside the prelude's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The prelude file is read once and kept for every VM after the first.",
    },
    {
      invariantKind: "departure",
      statement: "The banned names are handed over before the prelude loads.",
    },
    {
      invariantKind: "departure",
      statement: "A seeded value waits until the next source is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A seeded value no Lua literal can carry is seeded as a stub instead.",
    },
    {
      invariantKind: "departure",
      statement: "A seeded function is seeded as a stub.",
    },
    {
      invariantKind: "departure",
      statement: "Source is handed over as one long literal rather than as an escaped string.",
    },
  ],
} as const satisfies Module
