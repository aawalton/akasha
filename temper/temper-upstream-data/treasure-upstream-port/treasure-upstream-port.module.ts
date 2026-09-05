import type { Module } from "@akasha/code-system/module"

export const treasureUpstreamPort = {
  id: "01a0683b-e6a4-74fb-9866-3bb7e5c636f1",
  pageTypeSlug: "module",
  slug: "treasure-upstream-port",
  definition: "the treasure pins upstream LibTreasure carries, copied out as TypeScript",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The upstream Lua file is read by running the file in a sandboxed Lua machine.",
    },
    {
      invariantKind: "departure",
      statement:
        "The upstream file is loaded as a chunk with a line appended to hand its data out.",
    },
    {
      invariantKind: "departure",
      statement: "A table keyed only by its own count from one is written as an array.",
    },
    {
      invariantKind: "departure",
      statement:
        "This module keeps its own serializer because the shared one writes every table as an object.",
    },
    {
      invariantKind: "departure",
      statement: "A run leaving the data table empty is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "The ported file names the upstream version the data came out of.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout the ported file lands in is named by the caller.",
    },
  ],
} as const satisfies Module
