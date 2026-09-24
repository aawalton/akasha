import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const engineReturns = {
  id: "01a0d3c5-5ecf-731e-8aac-e6d41396fb48",
  type: "page-type/data-table",
  slug: "engine-returns",
  definition: "every function the game documents, with the kinds of value it gives back",
  data: "json",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A function is kept whether the documentation gives it a return or none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A return is kept as a kind rather than as a type the compiler would read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kinds are a number, a word, a truth, a table, and nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A return the documentation names by an enumeration is a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The functions are ordered by name, so a version bump moves only what changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the documentation carries is kept beside the functions.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No function of an object is kept here, because no such function is a global.",
    },
  ],
} as const satisfies DataTable
