import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lostTreasureSavedVars = {
  id: "01a06141-800a-7640-8fdd-65e24d780c85",
  type: "page-type/module",
  slug: "lost-treasure-saved-vars",
  definition: "what the player chose, kept between sessions",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved icon that is none of the icons shipped falls back at every load.",
    },
  ],
  createdAt: "2026-09-02T08:34:37.706Z",
  updatedAt: "2026-09-25T19:51:23.000Z",
} as const satisfies Module
