import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const scriptIds = {
  id: "01a0df12-aff3-75c3-9f9e-46310a92b160",
  type: "page-type/data-table",
  slug: "script-ids",
  definition: "the id of every focus, signature and affix script a grimoire may take",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `script-ids-keeping` writes this table from the script pages.",
    },
  ],
} as const satisfies DataTable
