import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const recipeCatalogCapture = {
  id: "01a060e2-3185-70bd-87e9-4d79d87182df",
  pageTypeSlug: "module",
  slug: "recipe-catalog-capture",
  definition: "the provisioning recipe lists, read into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "A recipe is keyed by the item id of that recipe.",
    },
    {
      invariantKind: "departure",
      statement: "A list holding no recipe is left out.",
    },
  ],
} as const satisfies Module
