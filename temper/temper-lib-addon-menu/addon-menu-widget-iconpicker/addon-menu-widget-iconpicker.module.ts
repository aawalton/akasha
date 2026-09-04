import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetIconpicker = {
  id: "01a06100-0000-7000-8000-000000000023",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-iconpicker",
  definition: "the icon swatch widget and its handle on the shared picker menu",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One icon picker menu is shared by every iconpicker on every panel.",
    },
    {
      invariantKind: "departure",
      statement: "Duplicate texture paths in the choices list are added once.",
    },
    {
      invariantKind: "departure",
      statement: "A beforeShow returning true cancels the opening of the menu.",
    },
    {
      invariantKind: "constraint",
      statement: "The default icon size is twenty-eight pixels.",
    },
  ],
} as const satisfies Module
