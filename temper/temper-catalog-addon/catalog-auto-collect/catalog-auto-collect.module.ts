import type { Module } from "@akasha/code-system/module"

export const catalogAutoCollect = {
  id: "01a063ba-94e5-761c-9dd4-1124b1de80bb",
  pageTypeSlug: "module",
  slug: "catalog-auto-collect",
  definition: "collecting on login whichever catalogs the saved table is still missing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A game version different from the saved one empties every catalog first.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing missing means the catalog is marked complete without any collector run.",
    },
    {
      invariantKind: "departure",
      statement: "The game version is written back only once the run is over.",
    },
  ],
} as const satisfies Module
