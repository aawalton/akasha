import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const poiCatalogCapture = {
  id: "01a060e2-3184-76cf-a0d0-62b8d40daca8",
  pageTypeSlug: "module",
  slug: "poi-catalog-capture",
  definition:
    "the points of interest of every zone story zone, read into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "Zone ids are read in a chain that ends where the game answers zero.",
    },
    {
      invariantKind: "departure",
      statement: "A zone holding no named point of interest is left out.",
    },
  ],
} as const satisfies Module
