import type { Module } from "@akasha/code-system/module"

export const watcherExportCompanionBuilds = {
  id: "01a06381-35cf-7009-899f-7e56d47c8435",
  pageTypeSlug: "module",
  slug: "watcher-export-companion-builds",
  definition:
    "each companion's target build written into the saved-variables file and into a side file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target build is exported only where its companion is known.",
    },
    {
      invariantKind: "departure",
      statement:
        "A companion no in-game id is known for is left out rather than refusing the whole export.",
    },
    {
      invariantKind: "departure",
      statement: "A build page absent leaves that companion out.",
    },
    {
      invariantKind: "departure",
      statement: "A build carrying no hash leaves that companion out.",
    },
    {
      invariantKind: "departure",
      statement: "A build's time is exported in whole seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A time that will not parse is taken as the time of the export.",
    },
    {
      invariantKind: "departure",
      statement: "The side file is written whether or not the saved-variables file changes.",
    },
    {
      invariantKind: "departure",
      statement: "No side-file path given answers no hash.",
    },
    {
      invariantKind: "departure",
      statement: "Content already holding every target build is handed back unchanged.",
    },
    {
      invariantKind: "departure",
      statement:
        "The target build block and the timestamp block share the indent detected from the file.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what reads the progress pages.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what reads the build pages.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what writes the side file.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what tells the time.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in where the log lines go.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what answers who is signed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the saved-variables file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes out a block keyed by numbers.",
    },
    {
      invariantKind: "gap",
      statement:
        "The page type the target builds are read from is declared in markdown rather than in TypeScript.",
    },
  ],
} as const satisfies Module
