import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreBookTables = {
  id: "01a0d622-edc7-7aca-83da-5b98573edbc3",
  type: "page-type/module",
  slug: "lore-book-tables",
  definition: "the lore book and collection pages, gathered into the tables the add-ons read",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A book with a game id is an entry of the LoreBooks book table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book with a number in a numbered collection is a book of the lore library.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Shalidor's Library pin is listed under its map, in the order the map lists it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection with a game id is an entry of the LoreBooks library table.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or writes one.",
    },
  ],
} as const satisfies Module
