import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherWorker = {
  id: "01a0674e-d7f8-75c9-a6ee-f3a19f736aca",
  type: "module",
  slug: "watcher-worker",
  definition: "the collaborators a watcher worker runs on, chosen and handed to the start",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This module is the only place the watcher worker's collaborators are chosen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The start is handed a collaborator rather than reaching for a collaborator.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The process shell the start refuses to hold is held here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An exit the start answers is carried out here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A signal handler is installed here rather than in the start.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The queue running uploads in turn runs each upload after the upload before that upload ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An upload that throws leaves the queue ready for the next upload.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The checkout a source update advances is the akasha checkout this module runs from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The session is opened once and every later reader takes that same session.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reader taken before the session is open is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The account a run outcome is reported under is read off the open session.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The session is the watcher's enrolment token checked against the page store.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The account the session names is the account that enrolment names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token the store matches to no enrolment answers a session with no user.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token that will not read answers a session with no user.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The token is checked once rather than on every ask.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here signs anyone in through a browser.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides the watcher's handling of a file that watcher read.",
    },
  ],
} as const satisfies Module
