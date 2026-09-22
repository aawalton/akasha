import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapDataUpstreamPort = {
  id: "01a0683b-e6a4-7275-8265-3fa1d955b928",
  type: "page-type/module",
  slug: "map-data-upstream-port",
  definition: "the map tables the upstream map-data library carries, copied out as TypeScript",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tables are serialized by Lua rather than carried across as values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run leaving the map table empty is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pseudo map indices are gathered from the globals the upstream file names those indices on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run capturing no pseudo map index is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ported file names the upstream version the data came out of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file written is named to the caller as soon as that file is written.",
    },
  ],
} as const satisfies Module
