import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherExportTasks = {
  id: "01a06381-35cf-79d7-a1eb-ab708052aacb",
  type: "module",
  slug: "watcher-export-tasks",
  definition:
    "the account's tasks written into the characters saved-variables file and into the addon's config",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tasks block and the character priority block go into the same file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The indent is read once for both blocks.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task is keyed by its page id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task has the game's character id rather than the character page's id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task row with no page id is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task already marked done is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key saying a task is done is read from the page type exported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No task at all leaves the saved-variables content unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a task marked as awaiting sync is marked back once that task is exported.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The config file is written only where a path is given and the run is for real.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An override row the completion package will not read is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An override is grouped under the game's character id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An override whose character has no game id is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Everything reaching the network or a file may be handed in by the caller.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides a character's priority.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes a file of its own.",
    },
  ],
} as const satisfies Module
