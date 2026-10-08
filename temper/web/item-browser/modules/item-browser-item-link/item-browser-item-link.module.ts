import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemBrowserItemLink = {
  id: "01a06178-371c-7c7f-a50b-0fa8f4c8822a",
  type: "page-type/module",
  slug: "item-browser-item-link",
  definition: "an item set row turned into the game's item link and the text the list shows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A crafted piece is shown with the glyph its armor weight's page names.",
    },
  ],
  createdAt: "2026-09-02T09:34:23.516Z",
  updatedAt: "2026-09-25T18:17:31.000Z",
} as const satisfies Module
