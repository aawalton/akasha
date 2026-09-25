import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const recipeData = {
  id: "01a060c0-4132-7121-b748-a5113359ebd8",
  type: "page-type/data-table",
  slug: "recipe-data",
  definition: "every crafting recipe the game knows, under the recipe list that has it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written by `recipe-list-writing` from the recipe list pages.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's report order sets a recipe's place in this table.",
    },
  ],
} as const satisfies DataTable
