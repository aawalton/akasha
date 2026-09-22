import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const filterBarControls = {
  id: "01a0614b-6736-7575-aaa0-1766a1adf1a8",
  type: "page-type/module",
  slug: "filter-bar-controls",
  definition: "one drawn editor per filter editor kind, laid out left to right",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An editor builder returns the x offset the next control starts at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An emptied editor clears its filter rather than setting an empty value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dropdown has an entry meaning the filter is off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An editor registers a reset with the bar context so the clear button can reach that reset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control name is built from the filter id with every non-word character replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter holding a value is shown by raising its control two surface levels.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No control here is edged, because the game edges nothing without a texture.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here places a row within the panel.",
    },
  ],
} as const satisfies Module
