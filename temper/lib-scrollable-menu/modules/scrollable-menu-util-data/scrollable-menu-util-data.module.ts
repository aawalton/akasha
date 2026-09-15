import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuUtilData = {
  id: "01a06275-c449-7ef3-b576-08766fcd81b5",
  type: "page-type/module",
  slug: "scrollable-menu-util-data",
  definition: "the readers that resolve a control to its name and to its underlying data table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Control names are memoised in a table keyed by the control itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A preventer variable counts down and clears once the count reaches zero.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An unnamed control resolves to the literal string n slash a.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture path is judged valid by its dds suffix alone.",
    },
  ],
} as const satisfies Module
