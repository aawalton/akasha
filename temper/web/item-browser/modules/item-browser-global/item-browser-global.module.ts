import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemBrowserGlobal = {
  id: "01a06178-371c-7a53-91d3-e4251c76d175",
  type: "page-type/module",
  slug: "item-browser-global",
  definition: "the three row handlers this add-on's own markup calls back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This global is the add-on's own name rather than a name the game owns.",
    },
  ],
  createdAt: "2026-09-02T09:34:23.516Z",
  updatedAt: "2026-09-22T14:01:43.000Z",
} as const satisfies Module
