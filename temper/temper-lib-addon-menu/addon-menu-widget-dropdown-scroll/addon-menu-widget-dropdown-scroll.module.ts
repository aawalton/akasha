import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetDropdownScroll = {
  id: "01a06100-0000-7000-8000-000000000020",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-dropdown-scroll",
  definition: "the height of a dropdown list computed from its visible row count",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Ten visible rows is the default when scrollable is true without a number.",
    },
    {
      invariantKind: "departure",
      statement: "A list shorter than the visible row count is sized to its own length.",
    },
    {
      invariantKind: "constraint",
      statement: "A rounding margin of one hundredth is added to the computed height.",
    },
  ],
} as const satisfies Module
