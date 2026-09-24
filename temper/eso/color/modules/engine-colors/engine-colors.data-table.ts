import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const engineColors = {
  id: "01a0d3f7-0fdb-77bb-b72d-6a325bfea0d2",
  type: "page-type/data-table",
  slug: "engine-colors",
  definition: "every color the game's engine gives its interface, by type and field",
  data: "json",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A color is kept under its type and then its field, each written as a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color is its red, green, blue and alpha, in that order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The types and fields are ordered by number, so a version bump moves only what changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the capture ran against is kept beside the colors it found.",
    },
  ],
} as const satisfies DataTable
