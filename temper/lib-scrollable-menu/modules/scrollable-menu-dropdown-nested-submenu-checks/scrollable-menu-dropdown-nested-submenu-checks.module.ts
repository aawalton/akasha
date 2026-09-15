import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownNestedSubmenuChecks = {
  id: "01a06275-c448-7cca-97e0-574c0568da33",
  type: "page-type/module",
  slug: "scrollable-menu-dropdown-nested-submenu-checks",
  definition: "the hover-time bookkeeping that clears the new-entry marker up the submenu chain",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A submenu counts as new when a child entry is new.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clearing the marker fires a library callback for the affected control.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The submenu hover hook has an empty body that only logs.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Reading upward stops at the first entry without a parent control.",
    },
  ],
} as const satisfies Module
