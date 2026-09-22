import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const engineConstants = {
  id: "01a0cac4-e923-708d-89e7-5df1cb4e4006",
  type: "page-type/data-table",
  slug: "engine-constants",
  definition: "every constant the game's engine declares, with the value the game gives it",
  data: "json",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A constant holding a number and one holding a word are kept apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The constants are ordered by name, so a version bump moves only what changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names of the constants holding words are kept whether or not the words are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A constant the saved file could not carry is named rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the capture ran against is kept beside the values it found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name of the function that listed the globals is kept beside them.",
    },
  ],
} as const satisfies DataTable
