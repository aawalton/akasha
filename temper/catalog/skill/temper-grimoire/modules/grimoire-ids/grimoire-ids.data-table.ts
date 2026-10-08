import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const grimoireIds = {
  id: "01a0df09-68ec-70e3-b83a-cf2c380da46f",
  type: "page-type/data-table",
  slug: "grimoire-ids",
  definition: "the id of every grimoire a character may scribe from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `grimoire-ids-keeping` writes this table from the grimoire pages.",
    },
  ],
  createdAt: "2026-09-26T18:45:30.988Z",
  updatedAt: "2026-09-26T18:45:43.000Z",
} as const satisfies DataTable
