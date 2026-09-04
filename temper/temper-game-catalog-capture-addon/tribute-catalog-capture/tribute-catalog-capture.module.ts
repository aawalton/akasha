import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const tributeCatalogCapture = {
  id: "01a060e2-3186-7ded-b973-6f823ba7313c",
  pageTypeSlug: "module",
  slug: "tribute-catalog-capture",
  definition:
    "the Tales of Tribute patrons and the cards of each patron, read into saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "A patron whose collectible falls under another category is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A dock card pair carrying no upgrade card is passed over.",
    },
  ],
} as const satisfies Module
