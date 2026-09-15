import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const traitResearchCatalogCapture = {
  id: "01a060e2-3185-7d5b-b999-a74d0bc90882",
  type: "module",
  slug: "trait-research-catalog-capture",
  definition: "the smithing research lines and traits, read into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Research lines are read for the four crafting types with research.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait name is read from the game's string table.",
    },
  ],
} as const satisfies Module
