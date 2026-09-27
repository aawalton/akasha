import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const skillTypeIds = {
  id: "01a0e094-6c15-7115-b637-4b5598205efa",
  type: "page-type/data-table",
  slug: "skill-type-ids",
  definition: "the id of every sort of use a skill is put to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `skill-type-ids-keeping` writes this table from the skill type pages.",
    },
  ],
} as const satisfies DataTable
