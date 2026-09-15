import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreLibraryCatalogCapture = {
  id: "01a060e2-3184-7000-83bf-82062963f749",
  type: "module",
  slug: "lore-library-catalog-capture",
  definition:
    "the lore library books by category and collection, read into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Books are asked for by index up to a fixed ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game gives no count of the books in a collection.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection with no named book is left out.",
    },
  ],
} as const satisfies Module
