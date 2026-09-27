import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const skillBarIds = {
  id: "01a0e096-154e-7aad-9c47-c2d3bbb6448d",
  type: "page-type/data-table",
  slug: "skill-bar-ids",
  definition: "the id of each of a character's two rows of slotted skills",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `skill-bar-ids-keeping` writes this table from the skill bar pages.",
    },
  ],
} as const satisfies DataTable
