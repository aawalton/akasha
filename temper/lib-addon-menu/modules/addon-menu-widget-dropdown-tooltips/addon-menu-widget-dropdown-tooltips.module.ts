import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetDropdownTooltips = {
  id: "01a08e64-006e-746c-af7a-60917c2846f1",
  type: "module",
  slug: "addon-menu-widget-dropdown-tooltips",
  definition: "the tooltip a combo box row shows while a pointer rests on that row",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row's tooltip is read off the data entry the row carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hooks are put on the one keyboard dropdown every combo box shares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook shows nothing for a row owned by another combo box.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty tooltip opens no window.",
    },
  ],
} as const satisfies Module
