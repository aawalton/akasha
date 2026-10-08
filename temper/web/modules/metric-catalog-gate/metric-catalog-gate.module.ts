import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricCatalogGate = {
  id: "01a0de73-1714-784a-96bf-19fa89a27ce0",
  type: "page-type/module",
  slug: "metric-catalog-gate",
  definition: "what shows its content only once the stats and stat tree are read",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is drawn again whenever the stats are read again.",
    },
  ],
  createdAt: "2026-09-26T16:01:19.636Z",
  updatedAt: "2026-09-26T16:01:50.000Z",
} as const satisfies Module
