import type { Module } from "@akasha/code-system/module"

export const journalWindow = {
  id: "01a0617d-5454-7cab-9709-1e96bec082bc",
  pageTypeSlug: "module",
  slug: "journal-window",
  definition: "the scene and menu bar the window is built from the first time the window is shown",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The window is built once and kept for as long as the game runs.",
    },
  ],
} as const satisfies Module
