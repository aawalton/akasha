import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alchemyStation = {
  id: "01a06054-98bc-78f0-afbb-f7343cb932bb",
  type: "module",
  slug: "alchemy-station",
  definition: "a tab added to the alchemy crafting station and the panel behind that tab",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel with every tab is created once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tab's own control fills the panel with every tab.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Switching mode hides every tab but the tab switched to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tab's callback runs only where the mode changed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The label above the panel is set from the name the tab has.",
    },
  ],
} as const satisfies Module
