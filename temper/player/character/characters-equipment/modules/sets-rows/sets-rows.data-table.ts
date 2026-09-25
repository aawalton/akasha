import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const setsRows = {
  id: "01a0d95f-49dd-720b-8acc-bc0a016bb596",
  type: "page-type/data-table",
  slug: "sets-rows",
  definition: "every gear set a character build can wear, at the place its page states",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "`akasha temper addon generate-set-tables` writes this table from the set pages.",
    },
  ],
} as const satisfies DataTable
