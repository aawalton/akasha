import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetDivider = {
  id: "01a06100-0000-7000-8000-000000000018",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-divider",
  definition: "the horizontal rule widget of the settings panel",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Height is clamped between ten and fifty pixels.",
    },
    {
      invariantKind: "departure",
      statement: "Alpha defaults to one quarter when the widget data omits alpha.",
    },
    {
      invariantKind: "absence",
      statement: "No label belongs to the divider.",
    },
    {
      invariantKind: "absence",
      statement: "No tooltip belongs to the divider.",
    },
    {
      invariantKind: "absence",
      statement: "No value belongs to the divider.",
    },
  ],
} as const satisfies Module
