import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const panelFilterBinding = {
  id: "01a0614b-6736-723e-b829-79279bb14e49",
  pageTypeSlug: "module",
  slug: "panel-filter-binding",
  definition: "the wrapper that hides the inventory rows the active filters reject",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The wrapper keeps the inventory's own filter and narrows what that filter passed.",
    },
    {
      invariantKind: "departure",
      statement: "An inventory with no active filter value shows every row.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose item facts cannot be read is shown.",
    },
    {
      invariantKind: "departure",
      statement: "The craft bag is wrapped again after each backpack layout.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a control.",
    },
  ],
} as const satisfies Module
