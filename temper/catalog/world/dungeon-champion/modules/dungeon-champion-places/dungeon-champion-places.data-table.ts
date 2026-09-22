import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const dungeonChampionPlaces = {
  id: "01a060f9-bad1-7202-bef3-dc48b30536e9",
  type: "page-type/data-table",
  slug: "dungeon-champion-places",
  definition: "every champion position gathered, reached by zone name or by map id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every zone is in one table rather than in a group of its own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The zones are in the order the source table had them.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "A zone is named once in the table.",
    },
  ],
} as const satisfies DataTable
