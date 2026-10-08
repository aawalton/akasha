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
  createdAt: "2026-09-27T01:49:16.789Z",
  updatedAt: "2026-09-27T01:49:36.000Z",
} as const satisfies DataTable
