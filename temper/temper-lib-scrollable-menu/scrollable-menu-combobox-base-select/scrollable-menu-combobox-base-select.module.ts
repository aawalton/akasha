import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseSelect = {
  id: "01a06275-c445-7558-8143-c9b8adcfa975",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-select",
  definition: "the selection of an entry in single-select and multi-select menus",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Clicking a no-results row is detected and suppressed before any callback runs.",
    },
    {
      invariantKind: "constraint",
      statement: "A disabled entry cannot be selected.",
    },
    {
      invariantKind: "departure",
      statement:
        "Exceeding the selection limit raises a game alert unless a callback intercepts the alert.",
    },
    {
      invariantKind: "departure",
      statement:
        "Single-select selection closes the dropdown while multi-select leaves the dropdown open.",
    },
  ],
} as const satisfies Module
