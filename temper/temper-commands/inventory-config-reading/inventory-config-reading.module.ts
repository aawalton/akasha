import type { Module } from "@akasha/code-system/module"

export const inventoryConfigReading = {
  id: "01a068e2-2268-7213-9a23-ecfcd6da6b5c",
  pageTypeSlug: "module",
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
      statement: "An ordered rule carries no id, the id being the caller's to hold.",
    },
    {
      invariantKind: "departure",
      statement: "A key this side has never heard of is carried through untouched.",
    },
  ],
} as const satisfies Module
