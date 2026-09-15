import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelFilterBinding = {
  id: "01a0614b-6736-723e-b829-79279bb14e49",
  type: "page-type/module",
  slug: "panel-filter-binding",
  definition: "the wrapper that hides the inventory rows the active filters reject",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The wrapper keeps the inventory's own filter and narrows the rows that filter passed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inventory with no active filter value shows every row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose item facts cannot be read is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The craft bag is wrapped again after each backpack layout.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws a control.",
    },
  ],
} as const satisfies Module
