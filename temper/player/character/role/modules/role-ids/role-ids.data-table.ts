import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const roleIds = {
  id: "01a0e08d-5ffc-788e-b6e9-b62fe8388491",
  type: "page-type/data-table",
  slug: "role-ids",
  definition: "the id of every part a character plays in a group",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `role-ids-keeping` writes this table from the character role pages.",
    },
  ],
} as const satisfies DataTable
