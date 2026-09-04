import type { Module } from "@akasha/code-system/module"

export const generateAddonData = {
  id: "01a0685f-fd9b-7000-b2e8-a507f1d0986d",
  pageTypeSlug: "module",
  slug: "generate-addon-data",
  definition: "one run writing every addon data file from the pages holding their source",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The output directories are made before any file is written into them.",
    },
    {
      invariantKind: "departure",
      statement: "Every write of a run is awaited before any total is reported.",
    },
    {
      invariantKind: "departure",
      statement:
        "The committed equipment mappings are answered for after the run has emitted its data.",
    },
    {
      invariantKind: "departure",
      statement: "Mappings that no longer match the emitted data stop the run.",
    },
    {
      invariantKind: "departure",
      statement: "Mappings that no longer match throw an error of their own kind.",
    },
    {
      invariantKind: "departure",
      statement: "Where a run reports to is handed in rather than being the console.",
    },
  ],
} as const satisfies Module
