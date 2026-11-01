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
      statement: "A multiselect dropdown picks any set of entries, and picking none turns it off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry naming an item quality is shown in that quality's color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An editor registers a reset with the bar context so removing its row can reach that reset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control name is built from the filter id with every non-word character replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bar button is a bare text choice, selected while its filter holds a value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bar button and a bare edit box are Temper's window controls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every editor is shown as filter pills.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A range editor is an operator pill and a value pill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An operator pill opens a menu of comparisons where the filter offers more than one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A multiselect pill names its one pick, or counts its picks.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here places a row within the panel.",
    },
  ],
  createdAt: "2026-09-02T08:45:26.710Z",
  updatedAt: "2026-11-01T22:11:58.614Z",
} as const satisfies Module
