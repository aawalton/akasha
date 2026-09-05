import type { Module } from "@akasha/code-system/module"

export const mainMenuSetup = {
  id: "01a0605b-c804-726c-8c9c-2b31fd139a9b",
  pageTypeSlug: "module",
  slug: "main-menu-setup",
  definition: "the controls and the callbacks the library sets up on its first use",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The category layout is taken by sitting in front of the game's own refresh.",
    },
    {
      invariantKind: "departure",
      statement: "The game's refresh is put back before the layout is read.",
    },
    {
      invariantKind: "departure",
      statement: "The bars this module sets up hang off one top level window.",
    },
    {
      invariantKind: "departure",
      statement: "Leaving secure render mode drops the market category back to inventory.",
    },
  ],
} as const satisfies Module
