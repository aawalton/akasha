import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const antiquityLoreCatalogCapture = {
  id: "01a060e2-3182-7e5c-bae4-5a096f5b7806",
  pageTypeSlug: "module",
  slug: "antiquity-lore-catalog-capture",
  definition: "the antiquities carrying lore entries, read into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "Antiquity ids are read in a chain that ends where the game answers zero.",
    },
    {
      invariantKind: "departure",
      statement: "An antiquity carrying no lore entry is left out.",
    },
  ],
} as const satisfies Module
