import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetButton = {
  id: "01a06100-0000-7000-8000-000000000013",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-button",
  definition: "the clickable button widget, with an optional icon face",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dangerous button asks for confirmation before running its function.",
    },
    {
      invariantKind: "departure",
      statement: "A dangerous button's warning text becomes the confirmation dialog body.",
    },
    {
      invariantKind: "constraint",
      statement: "An icon button is a bare 26 by 26 texture rather than a labelled button.",
    },
  ],
} as const satisfies Module
