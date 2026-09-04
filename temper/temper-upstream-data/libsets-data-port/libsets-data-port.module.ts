import type { Module } from "@akasha/code-system/module"

export const libsetsDataPort = {
  id: "01a06341-d9e8-7001-b3d8-ac888e8c7c0b",
  pageTypeSlug: "module",
  slug: "libsets-data-port",
  definition: "upstream LibSets's own data tables copied out as TypeScript",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The upstream Lua files are run in order in a sandboxed Lua machine.",
    },
    {
      invariantKind: "departure",
      statement: "A table is serialized by Lua rather than carried across as a value.",
    },
    {
      invariantKind: "departure",
      statement: "A table carrying a metatable is refused as an unseeded global's stub.",
    },
    {
      invariantKind: "departure",
      statement: "A table keyed by both halves of a boolean is written as a pair.",
    },
    {
      invariantKind: "departure",
      statement: "A number the game names is written as that name rather than as the number.",
    },
    {
      invariantKind: "departure",
      statement: "A non-finite number is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "The folder the ported data lands in is named by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "Every ported file names the upstream commit the data came out of.",
    },
    {
      invariantKind: "gap",
      statement: "Where the ported set data lands is settled by the LibSets library's own move.",
    },
  ],
} as const satisfies Module
