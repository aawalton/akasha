import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherExportCompanionBuilds = {
  id: "01a06381-35cf-7009-899f-7e56d47c8435",
  type: "page-type/module",
  slug: "watcher-export-companion-builds",
  definition:
    "each companion's target build written into the saved-variables file and into a side file",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A target build is exported only where its companion is known.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A progress page's companion is read off the address of the companion's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companion left out as unknown is named by the address its progress page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companion no in-game id is known for is left out rather than refusing the whole export.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build page absent leaves that companion out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build with no hash leaves that companion out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build's time is exported in whole seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A time that will not parse is taken as the time of the export.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The side file is written whether or not the saved-variables file changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No side-file path given answers no hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Content already holding every target build is handed back unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The target build block and the timestamp block share the indent detected from the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the reader of the progress pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The progress pages read are the ones naming the user's account page address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the reader of the build pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the writer of the side file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in the clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in where the log lines go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller may hand in what answers who is signed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the saved-variables file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes out a block keyed by numbers.",
    },
  ],
} as const satisfies Module
