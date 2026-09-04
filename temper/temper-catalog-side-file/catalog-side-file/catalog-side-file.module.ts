import type { Module } from "@akasha/code-system/module"

export const catalogSideFile = {
  id: "01a060ce-b8cb-776b-b2b7-0589a741c9c4",
  pageTypeSlug: "module",
  slug: "catalog-side-file",
  definition: "the request the catalog addon reads, taken out of Lua and written back as Lua",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file the addon's table cannot be read out of reads as no request.",
    },
    {
      invariantKind: "departure",
      statement: "A file setting the addon's table to nil reads as no request.",
    },
    {
      invariantKind: "departure",
      statement: "A request names each domain once.",
    },
    {
      invariantKind: "departure",
      statement: "The domains a request names are written in alphabetical order.",
    },
    {
      invariantKind: "departure",
      statement: "A request naming no domain asks the addon to collect every domain again.",
    },
    {
      invariantKind: "departure",
      statement: "A written request carries a version above the version the last request carried.",
    },
    {
      invariantKind: "departure",
      statement: "A written request carries a version at least as high as the clock reads.",
    },
    {
      invariantKind: "departure",
      statement: "A written request opens with a line saying no hand edits the file.",
    },
    {
      invariantKind: "departure",
      statement:
        "An empty Lua table read where a domain list was asked for reads as an empty list.",
    },
  ],
} as const satisfies Module
