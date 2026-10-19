import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherExportLandedCatalogs = {
  id: "01a15549-a636-7e9c-a208-8dc3247c7cfb",
  type: "page-type/module",
  slug: "watcher-export-landed-catalogs",
  definition: "the catalogs already landed in akasha, named in the catalog addon's config",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each catalog landed is named with the game version and invalidation it was for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalog addon drops a catalog's table where the config names it as landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything else the config already has is kept as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A config holding text this cannot read is refused rather than written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No config path given writes nothing and answers no hash.",
    },
  ],
  createdAt: "2026-10-19T17:50:52.469Z",
  updatedAt: "2026-10-19T17:50:52.469Z",
} as const satisfies Module
