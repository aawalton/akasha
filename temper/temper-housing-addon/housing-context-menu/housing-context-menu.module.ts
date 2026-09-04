import type { Module } from "@akasha/code-system/module"

export const housingContextMenu = {
  id: "01a06128-d5ca-706a-a06b-ee7f1746eb74",
  pageTypeSlug: "module",
  slug: "housing-context-menu",
  definition: "adding a send-visit-card entry to the chat and guild-roster right-click menus",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game's own context-menu function is wrapped rather than replaced.",
    },
    {
      invariantKind: "gap",
      statement: "The wrap is put on after a delay the game needs to build a context menu.",
    },
  ],
} as const satisfies Module
