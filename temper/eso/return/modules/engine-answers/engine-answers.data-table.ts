import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const engineAnswers = {
  id: "01a0d42d-e85b-7db0-93e2-43cac932182a",
  type: "page-type/data-table",
  slug: "engine-answers",
  definition: "what the running game answered each function it was asked, by name",
  data: "json",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A function's answers are kept under the function's name, in the order given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The functions are ordered by name, so a version bump moves only what changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the capture ran against is kept beside the answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A function asked with values keeps its answers under its name and those values joined by commas.",
    },
  ],
} as const satisfies DataTable
