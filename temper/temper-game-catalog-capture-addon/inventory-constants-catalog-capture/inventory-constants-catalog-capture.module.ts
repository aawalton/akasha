import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryConstantsCatalogCapture = {
  id: "01a06127-6637-741d-b7cf-e75c80c39e3d",
  pageTypeSlug: "module",
  slug: "inventory-constants-catalog-capture",
  definition:
    "the game's inventory enumerations, read out of the client into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "Every enumeration is gathered in one pass with no batching.",
    },
    {
      invariantKind: "departure",
      statement: "Each label table is built by the one loop that names a string prefix.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the player's own inventory.",
    },
  ],
} as const satisfies Module
