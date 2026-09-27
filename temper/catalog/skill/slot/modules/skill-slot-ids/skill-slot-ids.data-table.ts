import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const skillSlotIds = {
  id: "01a0e0c2-45db-7c1a-8de2-ff396ebc255f",
  type: "page-type/data-table",
  slug: "skill-slot-ids",
  definition: "the id of every place on the bar for a skill",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The change generator `skill-slot-ids-keeping` writes this table from its pages.",
    },
  ],
} as const satisfies DataTable
