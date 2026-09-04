import type { Module } from "@akasha/code-system/module"

export const addonMenuPanelOptions = {
  id: "01a06100-0000-7000-8000-000000000006",
  pageTypeSlug: "module",
  slug: "addon-menu-panel-options",
  definition:
    "the lifecycle of one addon's options panel from widget creation through open and close",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Widgets are created twenty at a time with ten milliseconds between batches.",
    },
    {
      invariantKind: "departure",
      statement:
        "A widget that fails to create is reported to chat rather than aborting the panel.",
    },
    {
      invariantKind: "constraint",
      statement: "Two consecutive half-width widgets are reparented into a shared twin container.",
    },
    {
      invariantKind: "departure",
      statement:
        "Setting a handler on a panel prints a warning naming the callback to use instead.",
    },
  ],
} as const satisfies Module
