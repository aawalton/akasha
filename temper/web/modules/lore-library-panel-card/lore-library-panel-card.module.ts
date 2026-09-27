import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreLibraryPanelCard = {
  id: "01a06421-f74b-7373-9a5c-c7e2f302002c",
  type: "page-type/module",
  slug: "lore-library-panel-card",
  definition: "the lore books the account has collected, by category and collection",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The card's title is read from the lore library's completion category page.",
    },
  ],
  code: "tsx",
} as const satisfies Module
