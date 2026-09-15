import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const furnitureCatalogCapture = {
  id: "01a060e2-3184-7486-8bde-685c51a8fc83",
  type: "page-type/module",
  slug: "furniture-catalog-capture",
  definition:
    "the housing furniture categories, read out of the client into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A furniture category has the subcategories of that category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category name and a subcategory name are both read by category id.",
    },
  ],
} as const satisfies Module
