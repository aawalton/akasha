import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownHandlerFunctions = {
  id: "01a06275-c448-701d-9543-d5f2bef911cb",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-handler-functions",
  definition: "the per-entry-type handlers for mouse enter, exit and up on a dropdown row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Handlers are keyed by entry type inside three named tables.",
    },
    {
      invariantKind: "departure",
      statement: "A header or divider handler returns true and does no other work.",
    },
    {
      invariantKind: "departure",
      statement:
        "Entering a submenu row cancels the pending hide timeout before showing the submenu.",
    },
    {
      invariantKind: "departure",
      statement:
        "The boolean a handler returns decides whether the ZO_ComboBox behaviour also runs.",
    },
  ],
} as const satisfies Module
