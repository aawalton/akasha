import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemSetCatalogCapture = {
  id: "01a06127-6644-7d5a-b5dd-845d71c2890e",
  pageTypeSlug: "module",
  slug: "item-set-catalog-capture",
  definition:
    "the game's item sets, with the pieces and category of each, read into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "Sets are read in batches so the client keeps answering while collection runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A set's category is the root of the category chain the client hangs the set under.",
    },
    {
      invariantKind: "departure",
      statement: "A set with no name or no pieces is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads which pieces the player has collected.",
    },
  ],
} as const satisfies Module
