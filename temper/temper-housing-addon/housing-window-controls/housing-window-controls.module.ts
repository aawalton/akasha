import type { Module } from "@akasha/code-system/module"

export const housingWindowControls = {
  id: "01a06128-d5d7-7454-b0b7-fa5c32e5a1dd",
  pageTypeSlug: "module",
  slug: "housing-window-controls",
  definition: "the search box and scroll frames the housing window is built from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scroll frame carries a slider the add-on made rather than the game's.",
    },
  ],
} as const satisfies Module
