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
      invariantKind: "invariant-kind/departure",
      statement: "The rules read here are the addon's compiled ones rather than the authored ones.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first account carrying a compiled block answers and the rest go unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule the addon left unnamed is named for its category and its place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ordered rule carries the id the addon gave it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ordered rule the addon left unnamed carries no id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key this side has never heard of is carried through untouched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every list a rule holds is named here, because Lua writes a list as a table keyed from one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A list left unnamed reaches a reader as a record, and every reader takes a list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An item rule the compiled config keys by item id is read back as a rule of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An item rule read back is named for the item it is written against.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The compiled config carries no name for the item an item rule names.",
    },
  ],
} as const satisfies Module
