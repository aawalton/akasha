import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knowledgeCuratedMotifs = {
  id: "01a0622b-dc56-709a-8da0-de660a3730f7",
  type: "page-type/module",
  slug: "knowledge-curated-motifs",
  definition: "which motif book carries which style and chapter",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading the numbered entries misses the named entry beside the numbered entries.",
    },
  ],
} as const satisfies Module
