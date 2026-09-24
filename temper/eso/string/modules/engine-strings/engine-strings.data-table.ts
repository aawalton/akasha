import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const engineStrings = {
  id: "01a0d417-2b3b-7497-869e-3567ed677896",
  type: "page-type/data-table",
  slug: "engine-strings",
  definition: "the text of every interface string the game names, by the name it gives it",
  data: "json",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A string's text is kept under the name the game gives that string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are ordered, so a version bump moves only what changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the capture ran against is kept beside the text it found.",
    },
  ],
} as const satisfies DataTable
