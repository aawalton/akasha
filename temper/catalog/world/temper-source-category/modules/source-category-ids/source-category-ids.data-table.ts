import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const sourceCategoryIds = {
  id: "01a0df30-d97d-7a1d-ada2-f3d69bd4abf1",
  type: "page-type/data-table",
  slug: "source-category-ids",
  definition: "the id of every group the sources of a build's numbers fall in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change generator `source-category-ids-keeping` writes this table from the source category pages.",
    },
  ],
  createdAt: "2026-09-26T19:28:35.709Z",
  updatedAt: "2026-09-26T19:28:44.000Z",
} as const satisfies DataTable
