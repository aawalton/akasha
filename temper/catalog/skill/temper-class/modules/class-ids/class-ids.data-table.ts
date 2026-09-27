import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const classIds = {
  id: "01a0e08d-6075-7d2d-a242-ca61bb1be908",
  type: "page-type/data-table",
  slug: "class-ids",
  definition: "the id of every class a character may take",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The change generator `class-ids-keeping` writes this table from the class pages.",
    },
  ],
} as const satisfies DataTable
