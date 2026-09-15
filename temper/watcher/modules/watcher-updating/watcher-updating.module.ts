import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherUpdating = {
  id: "01a063c7-b025-7d65-8dfd-3914b90eaf4e",
  type: "module",
  slug: "watcher-updating",
  definition:
    "how a watcher worker learns a newer version is deployed and advances onto that version",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A deployed version string differing from the running version string is an available update.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A version string that is empty once trimmed is a malformed body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A content-type not naming application/json is refused before the body is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is not JSON is a malformed body rather than a thrown error.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Fields beside version in the body are tolerated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The detail on a failed check carries at most 200 characters of the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The detail on a failed check collapses each run of whitespace to one space.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A content-type that is empty is written into the detail as no content-type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An equal flag answers equal ahead of both ancestor flags.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a source checkout behind the target sha is fast-forwarded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A source checkout ahead of the target sha is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A source checkout diverged from the target sha is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A git command exiting non-zero is read as an answer rather than thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The repository directory reaches git as -C rather than as a working directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An advanced source checkout exits the worker with code 75.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The downloaded executable is written beside the running executable before any rename.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker exits zero once the executable is swapped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A failed deletion of the superseded executable is swallowed.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Under the source runtime no executable is downloaded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the fetch answering the deployed version.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the fetch answering the executable.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the path of the running executable.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the act exiting the worker.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the source repository git is asked through.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides when an update check is due.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here restarts the temper-watcher service.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The version the worker runs is named by the caller rather than read here.",
    },
  ],
} as const satisfies Module
