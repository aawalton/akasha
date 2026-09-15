import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectiblesCatalogCapture = {
  id: "01a060e2-3183-736c-b68e-33f414a5785c",
  type: "module",
  slug: "collectibles-catalog-capture",
  definition: "the collectibles by category, read in batches into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Collectibles are read in batches so the client keeps its frame rate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A collectible the game blacklists is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category with no collectible is dropped before the write.",
    },
  ],
} as const satisfies Module
