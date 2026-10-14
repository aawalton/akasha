import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricCatalogLoading = {
  id: "01a13ac6-0c64-7577-a066-20d7f033e67a",
  type: "page-type/module",
  slug: "metric-catalog-loading",
  definition: "the one read that fills the held metric catalogue from the metric pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which pages and fields the catalogue is read from is stated once, here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test reads the same pages and fields from the checkout rather than the store.",
    },
  ],
  createdAt: "2026-10-14T14:17:00.259Z",
  updatedAt: "2026-10-14T14:17:00.259Z",
} as const satisfies Module
