import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuApiShow = {
  id: "01a06275-c443-70ac-b0c3-8545be8ec149",
  type: "module",
  slug: "scrollable-menu-api-show",
  definition: "the globals covering the context menu from options through show to clear",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Clearing the menu hides the menu and restores the default option table.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A special callback must have a unique addon name or the call errors.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Options given to show are passed through a library callback before being applied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Entry-type filtering of the callback item list runs against the allowed-type table.",
    },
  ],
} as const satisfies Module
