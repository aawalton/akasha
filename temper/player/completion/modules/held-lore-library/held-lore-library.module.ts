import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const heldLoreLibrary = {
  id: "01a0e252-b19b-7c47-8841-5411613d234e",
  type: "page-type/module",
  slug: "held-lore-library",
  definition:
    "the lore library's categories, collections and books, read from their pages and held",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category, collection or book is named by the title its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection whose page states no title is named by an empty name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A collection with no number in its category is no collection of the lore library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book with no number or no title is no book of the lore library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Categories, collections and books are listed in the order of their numbers.",
    },
  ],
} as const satisfies Module
