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
} as const satisfies Module
