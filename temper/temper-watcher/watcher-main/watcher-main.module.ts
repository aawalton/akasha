import type { Module } from "@akasha/code-system/module"

export const watcherMain = {
  id: "01a063c7-b077-7e6b-abbc-744232614c20",
  pageTypeSlug: "module",
  slug: "watcher-main",
  definition:
    "the startup of a watcher worker, from signing in to watching every saved-variables file",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here ends the process.",
    },
    {
      invariantKind: "departure",
      statement: "An exit the worker should make is answered to the caller.",
    },
    {
      invariantKind: "departure",
      statement: "An exit answered carries the code the worker should end on.",
    },
    {
      invariantKind: "departure",
      statement: "An exit answered carries what wanted the exit.",
    },
    {
      invariantKind: "departure",
      statement: "A source update that advanced answers an exit rather than ending the process.",
    },
    {
      invariantKind: "departure",
      statement:
        "An update wanted after startup reaches the caller through a call the caller handed in.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind of file the watcher knows is watched by one loop over the kinds.",
    },
    {
      invariantKind: "departure",
      statement: "The file name a watch is logged under is read off the path the config names.",
    },
    {
      invariantKind: "departure",
      statement: "The name a handler is given is read off that file name.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is absent is warned about.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is absent is left unwatched.",
    },
    {
      invariantKind: "departure",
      statement: "No file present to watch answers an exit.",
    },
    {
      invariantKind: "departure",
      statement: "Every collaborator that reaches outside this module is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The clock is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "What watches a file for changes is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "What repeats the hourly update check is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The queue that runs uploads in turn is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout a source update advances is named by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "What the watcher remembers about each file is made afresh on every start.",
    },
    {
      invariantKind: "departure",
      statement: "The running version is worked out once at startup.",
    },
    {
      invariantKind: "departure",
      statement: "An update check within a minute of the previous check does nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping unwatches every file watched.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping halts the hourly update check.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping leaves the process running.",
    },
    {
      invariantKind: "departure",
      statement: "A session naming no account answers an exit rather than signing anyone in.",
    },
    {
      invariantKind: "departure",
      statement:
        "The server address is read from the environment only where a session is already valid.",
    },
    {
      invariantKind: "departure",
      statement: "The startup inventory sync names the file the content was read from.",
    },
    {
      invariantKind: "departure",
      statement: "The startup inventory sync names the modification time of that file.",
    },
    {
      invariantKind: "departure",
      statement: "A fatal report is built as text rather than written anywhere.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here installs a signal handler.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which account a run outcome is reported under.",
    },
    {
      invariantKind: "departure",
      statement: "The worker module hands this one a dispatch.",
    },
    {
      invariantKind: "departure",
      statement: "The worker module hands this one the session the account is read from.",
    },
    {
      invariantKind: "departure",
      statement: "The worker module beside this one builds and runs this module.",
    },
    {
      invariantKind: "departure",
      statement: "The worker the systemd unit starts is the worker module beside this one.",
    },
  ],
} as const satisfies Module
