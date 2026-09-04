import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const traitResearchCatalogCapture = {
  id: "01a060e2-3185-7d5b-b999-a74d0bc90882",
  pageTypeSlug: "module",
  slug: "trait-research-catalog-capture",
  definition: "the smithing research lines and traits, read into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "Research lines are read for the four crafting types carrying research.",
    },
    {
      invariantKind: "departure",
      statement: "A trait name is read from the game's string table.",
    },
  ],
} as const satisfies Module
