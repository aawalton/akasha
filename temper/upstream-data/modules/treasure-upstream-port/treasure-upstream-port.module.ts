import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treasureUpstreamPort = {
  id: "01a0683b-e6a4-74fb-9866-3bb7e5c636f1",
  type: "module",
  slug: "treasure-upstream-port",
  definition: "the treasure pins upstream LibTreasure carries, copied out as TypeScript",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The upstream file is loaded as a chunk with a line appended to hand its data out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table whose keys count up from the first index is written as an array.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This module keeps its own serializer rather than the shared serializer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run leaving the data table empty is refused rather than written.",
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
