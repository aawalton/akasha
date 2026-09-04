import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const catalogDescriptor = {
  id: "01a06071-0c77-71fa-866d-8ddbd099aa5c",
  pageTypeSlug: "module",
  slug: "catalog-descriptor",
  definition:
    "the name, version and empty defaults the catalog add-on hands the game to save under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The defaults name every field the payload carries.",
    },
    {
      invariantKind: "departure",
      statement: "The game saves the add-on under the name `TemperCatalog_SavedVariables`.",
    },
    {
      invariantKind: "departure",
      statement: "A load time is kept.",
    },
  ],
} as const satisfies Module
