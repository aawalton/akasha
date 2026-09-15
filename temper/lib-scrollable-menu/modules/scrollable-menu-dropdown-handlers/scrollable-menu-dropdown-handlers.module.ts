import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownHandlers = {
  id: "01a06275-c448-75c4-bb2b-16f01a915b1e",
  type: "page-type/module",
  slug: "scrollable-menu-dropdown-handlers",
  definition: "the row construction and recycling behind the dropdown scroll list",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "One shared named update handler serves as the submenu show timeout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last entry of a list is given a distinct scroll type id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Resetting a pooled row hides that row and takes the row's button out of the button group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Row width is measured from the label text through the item font object.",
    },
  ],
} as const satisfies Module
