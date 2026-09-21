import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipeData = {
  id: "01a060c0-4132-7121-b748-a5113359ebd8",
  type: "page-type/module",
  slug: "recipe-data",
  definition: "every crafting recipe the game knows, under the recipe list that has it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is captured from the game rather than written by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's report order sets a recipe's place in this table.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A recipe moved to another place drifts from the index the game has.",
    },
  ],
} as const satisfies Module
