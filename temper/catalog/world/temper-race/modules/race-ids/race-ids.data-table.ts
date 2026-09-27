import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const raceIds = {
  id: "01a0e08d-6075-779c-a9ce-24a50b5f5bbf",
  type: "page-type/data-table",
  slug: "race-ids",
  definition: "the id of every race a character may be",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The change generator `race-ids-keeping` writes this table from the race pages.",
    },
  ],
} as const satisfies DataTable
