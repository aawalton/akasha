import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherMain = {
  id: "01a063c7-b077-7e6b-abbc-744232614c20",
  type: "module",
  slug: "watcher-main",
  definition:
    "the startup of a watcher worker, from signing in to watching every saved-variables file",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here ends the process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An exit the worker should make is answered to the caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An exit answered has the code the worker should end on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An exit answered has the reason the exit was wanted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A source update that advanced answers an exit rather than ending the process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An update wanted after startup reaches the caller through a call the caller handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every kind of file the watcher knows is watched by one loop over the kinds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file name a watch is logged under is read off the path the config names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name a handler is given is read off that file name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that is absent is warned about.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that is absent is left unwatched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No file present to watch answers an exit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every collaborator that reaches outside this module is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The clock is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The call that watches a file for changes is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The call that repeats the hourly update check is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The queue that runs uploads in turn is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout a source update advances is named by the caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The state the watcher remembers about each file is made afresh on every start.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The running version is worked out once at startup.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An update check within a minute of the previous check does nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Stopping unwatches every file watched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Stopping halts the hourly update check.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Stopping leaves the process running.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session naming no account answers an exit rather than signing anyone in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The server address is read from the environment only where a session is already valid.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The startup inventory sync names the file the content was read from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The startup inventory sync names the modification time of that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fatal report is built as text rather than written anywhere.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here installs a signal handler.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides which account a run outcome is reported under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker module hands this module a dispatch.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker module hands this module the session the account is read from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker module beside this module builds and runs this module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker the systemd unit starts is the worker module beside this module.",
    },
  ],
} as const satisfies Module
