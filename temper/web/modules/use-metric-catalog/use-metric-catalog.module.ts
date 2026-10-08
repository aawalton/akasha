import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useMetricCatalog = {
  id: "01a0de73-1714-7025-882f-ddee0054b5c9",
  type: "page-type/module",
  slug: "use-metric-catalog",
  definition:
    "the stats and stat tree a screen reads from their pages, held while the screen is open",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen reads the stat pages only where it draws something a stat decides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat page changing while a screen is open reaches that screen with no refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that fails is thrown to the screen rather than drawn as no stats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion's stats and their groups are held from the same read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a build's stats are worked out from is recalculated when the stats are read again.",
    },
  ],
  createdAt: "2026-09-26T16:01:19.636Z",
  updatedAt: "2026-09-26T18:53:02.000Z",
} as const satisfies Module
