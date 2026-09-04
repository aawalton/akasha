import type { Module } from "@akasha/code-system/module"

export const catalogFilePaths = {
  id: "01a060ce-b8cc-7704-9bd1-cd4631423a3c",
  pageTypeSlug: "module",
  slug: "catalog-file-paths",
  definition: "where the catalog addon's saved file and its request file are looked for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path the caller says is taken ahead of the path worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "The saved file is looked for where the game writes saved variables.",
    },
    {
      invariantKind: "departure",
      statement: "The request file is looked for in the catalog addon's own folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
