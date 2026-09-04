import type { Module } from "@akasha/code-system/module"

export const knowledgeMain = {
  id: "01a0622b-dc5b-7521-9cc9-030f60f5f84e",
  pageTypeSlug: "module",
  slug: "knowledge-main",
  definition: "the wiring the library does as the game loads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The order these are loaded in is the order upstream loads them.",
    },
  ],
} as const satisfies Module
