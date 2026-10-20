import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const buildCodecV52RankPages = {
  id: "01a156c4-e297-7828-9c63-cf48ad0a5592", type: "page-type/data-table",
  slug: "build-codec-v52-rank-pages",
  definition: "each passive rank page a build hash before minor version ten holds a place for",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank page is a passive page for a rank below the top of its passive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rank page keeps its place among every skill and among every passive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash before minor version ten is read with every rank page at its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank page's bit is read as its base page, which is its passive's top rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank page's rank is the one rank whose capture sets that page's bit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank page whose bit more than one rank sets states no rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rank and its ability id were read from the game's own skill tree.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A capture sets the bit of its rank's own page, or else of the lowest paged rank.",
    },
  ], createdAt: "2026-10-20T00:45:06.070Z", updatedAt: "2026-10-20T19:48:05.984Z",
} as const satisfies DataTable
