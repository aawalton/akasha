import type { Module } from "@akasha/code-system/module"

export const mapDataUpstreamPort = {
  id: "01a0683b-e6a4-7275-8265-3fa1d955b928",
  pageTypeSlug: "module",
  slug: "map-data-upstream-port",
  definition: "the map tables upstream LibMapData carries, copied out as TypeScript",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The upstream Lua file is read by running the file in a sandboxed Lua machine.",
    },
    {
      invariantKind: "departure",
      statement: "The tables are serialized by Lua rather than carried across as values.",
    },
    {
      invariantKind: "departure",
      statement: "A run leaving the map table empty is refused rather than written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pseudo map indices are gathered from the globals the upstream file names them on.",
    },
    {
      invariantKind: "departure",
      statement: "A run capturing no pseudo map index is refused rather than written.",
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
