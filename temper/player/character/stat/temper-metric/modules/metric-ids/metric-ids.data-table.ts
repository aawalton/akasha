import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const metricIds = {
  id: "01a0def7-b4fa-7793-82f8-b726836da742",
  type: "page-type/data-table",
  slug: "metric-ids",
  definition: "the id of every stat a character build is measured by",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The change generator `metric-ids-keeping` writes this table from the stat pages.",
    },
  ],
} as const satisfies DataTable
