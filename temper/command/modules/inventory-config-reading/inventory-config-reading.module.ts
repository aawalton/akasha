import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryConfigReading = {
  id: "01a068e2-2268-7213-9a23-ecfcd6da6b5c",
  type: "module",
  slug: "inventory-config-reading",
  definition: "the compiled rule config the inventory addon wrote into its saved variables",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules read here are the addon's compiled ones rather than the authored ones.",
    },
    {
      invariantKind: "departure",
      statement: "The first account carrying a compiled block answers and the rest go unread.",
    },
    {
      invariantKind: "departure",
      statement: "A rule the addon left unnamed is named for its category and its place.",
    },
    {
      invariantKind: "departure",
      statement: "An ordered rule carries the id the addon gave it.",
    },
    {
      invariantKind: "departure",
      statement: "An ordered rule the addon left unnamed carries no id.",
    },
    {
      invariantKind: "departure",
      statement: "A key this side has never heard of is carried through untouched.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every list a rule holds is named here, because Lua writes a list as a table keyed from one.",
    },
    {
      invariantKind: "departure",
      statement: "A list left unnamed reaches a reader as a record, and every reader takes a list.",
    },
    {
      invariantKind: "departure",
      statement:
        "An item rule the compiled config keys by item id is read back as a rule of its own.",
    },
    {
      invariantKind: "departure",
      statement: "An item rule read back is named for the item it is written against.",
    },
    {
      invariantKind: "absence",
      statement: "The compiled config carries no name for the item an item rule names.",
    },
  ],
} as const satisfies Module
