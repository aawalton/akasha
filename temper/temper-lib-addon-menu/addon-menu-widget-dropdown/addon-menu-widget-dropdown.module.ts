import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetDropdown = {
  id: "01a06100-0000-7000-8000-000000000019",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-dropdown",
  definition: "the combo box widget, single-select or multi-select, over a fixed list of choices",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Sorting is done in a pre-hook on UpdateItems rather than by the combo box.",
    },
    {
      invariantKind: "constraint",
      statement: "Choices and choicesValues must be the same length.",
    },
    {
      invariantKind: "departure",
      statement: "A right click on a multi-select box offers select-all and clear-all menu items.",
    },
    {
      invariantKind: "departure",
      statement: "Tooltip hooks are installed only when the widget data supplies tooltips.",
    },
  ],
} as const satisfies Module
