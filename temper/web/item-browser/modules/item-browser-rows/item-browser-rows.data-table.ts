import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const itemBrowserRows = {
  id: "01a0d8f1-afb5-7d35-8bc4-1a8b07435d19",
  type: "page-type/data-table",
  slug: "item-browser-rows",
  definition: "the item browser's row for each set",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "`akasha temper addon generate-set-tables` writes this table from the set pages.",
    },
  ],
} as const satisfies DataTable
