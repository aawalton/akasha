import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownHandlers = {
  id: "01a06275-c448-75c4-bb2b-16f01a915b1e",
  type: "module",
  slug: "scrollable-menu-dropdown-handlers",
  definition: "the row construction and recycling behind the dropdown scroll list",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "One shared named update handler serves as the submenu show timeout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The last entry of a list is given a distinct scroll type id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Resetting a pooled row hides that row and takes the row's button out of the button group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Row width is measured from the label text through the item font object.",
    },
  ],
} as const satisfies Module
