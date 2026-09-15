import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportErrors = {
  id: "01a06381-35cf-7a59-98a9-0d96ea20a841",
  type: "module",
  slug: "watcher-import-errors",
  definition:
    "the watcher's handling of a saved errors file, from reading it to logging what is new",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every error in the file is judged before any error is carried up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An error is judged stale against the latest moment any error in the file was seen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every addon is judged as though outside the repository.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Recency alone makes an error stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error unseen for twenty-four hours is stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may name another span in place of the twenty-four hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error left unjudged is carried up rather than held back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The cursor is saved before any line reaches the log.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How many errors were held back is logged before any error is logged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every error carried up is logged as one line of json.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The count of errors carried up is logged after every envelope.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run with nothing up logs that nothing was new or had recurred.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One addon's build id file is read once for a whole run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may name the cursor file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may name the log.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may name where a build id is read from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The watcher's own log is written where the caller names no log.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides which errors are carried up.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens the saved errors file.",
    },
  ],
} as const satisfies Module
