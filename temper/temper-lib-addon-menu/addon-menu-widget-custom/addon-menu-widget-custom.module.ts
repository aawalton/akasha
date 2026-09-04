import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetCustom = {
  id: "01a06100-0000-7000-8000-000000000016",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-custom",
  definition: "the empty height-bounded container widget of the settings panel",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Height is bounded by a minimum and by four times that minimum.",
    },
    {
      invariantKind: "departure",
      statement: "The addon's create function runs after the control is registered for refresh.",
    },
    {
      invariantKind: "absence",
      statement: "No value is read or written by the custom widget itself.",
    },
  ],
} as const satisfies Module
