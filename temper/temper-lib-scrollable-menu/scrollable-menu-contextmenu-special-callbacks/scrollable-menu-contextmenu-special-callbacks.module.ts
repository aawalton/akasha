import type { Module } from "@akasha/code-system/module"

export const scrollableMenuContextmenuSpecialCallbacks = {
  id: "01a06275-c447-73b4-84ed-9d98c66f63d5",
  pageTypeSlug: "module",
  slug: "scrollable-menu-contextmenu-special-callbacks",
  definition: "the registry of per-addon show and hide callbacks on the context menu",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Callbacks are keyed by a unique addon name supplied by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "The registry is a numerically indexed list of single-addon tables.",
    },
    {
      invariantKind: "departure",
      statement: "Running a callback keeps the first truthy return across every addon.",
    },
    {
      invariantKind: "constraint",
      statement: "A registration whose named field is not a function is rejected.",
    },
  ],
} as const satisfies Module
