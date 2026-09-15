import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherExportCompanionBuilds = {
  id: "01a06381-35cf-7009-899f-7e56d47c8435",
  type: "module",
  slug: "watcher-export-companion-builds",
  definition:
    "each companion's target build written into the saved-variables file and into a side file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A target build is exported only where its companion is known.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A companion no in-game id is known for is left out rather than refusing the whole export.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build page absent leaves that companion out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build with no hash leaves that companion out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build's time is exported in whole seconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A time that will not parse is taken as the time of the export.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The side file is written whether or not the saved-variables file changes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No side-file path given answers no hash.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Content already holding every target build is handed back unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The target build block and the timestamp block share the indent detected from the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the reader of the progress pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the reader of the build pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the writer of the side file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the clock.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in where the log lines go.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in what answers who is signed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the saved-variables file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes out a block keyed by numbers.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "The page type the target builds are read from is declared in markdown rather than in TypeScript.",
    },
  ],
} as const satisfies Module
