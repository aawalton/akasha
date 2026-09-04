import type { Module } from "@akasha/code-system/module"

export const watcherDispatchHandling = {
  id: "01a063c7-b064-74a3-9ffc-0be1edaadd02",
  pageTypeSlug: "module",
  slug: "watcher-dispatch-handling",
  definition: "one change to a watched file turned into one dispatch of that file's content",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change arriving while a run of the same file is in progress is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A change arriving before the debounce has elapsed is dropped.",
    },
    {
      invariantKind: "departure",
      statement:
        "The debounce is measured from when the last run began rather than from when that run ended.",
    },
    {
      invariantKind: "departure",
      statement: "The clock the debounce reads is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The run is handed to a queue rather than awaited here.",
    },
    {
      invariantKind: "departure",
      statement: "A file that never settles is reported as skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A file absent from disk is reported as not found.",
    },
    {
      invariantKind: "departure",
      statement: "Content matching the last write-back is dropped rather than dispatched.",
    },
    {
      invariantKind: "departure",
      statement: "Content closing with no brace is reported as a parse failure.",
    },
    {
      invariantKind: "departure",
      statement: "A write-back is refused where the file changed after the stable read.",
    },
    {
      invariantKind: "departure",
      statement: "The dispatch this handler calls is handed in rather than imported.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which side file a kind of file has is read off the operation targets rather than branched on here.",
    },
    {
      invariantKind: "departure",
      statement: "A side file config path key is derived from that side file's name.",
    },
    {
      invariantKind: "departure",
      statement: "A side file hash the dispatch answers is remembered against the file.",
    },
    {
      invariantKind: "departure",
      statement: "A throw inside the run is logged rather than raised.",
    },
    {
      invariantKind: "departure",
      statement: "A run that ends leaves the file marked as no longer running.",
    },
    {
      invariantKind: "gap",
      statement: "No module yet hands this handler a dispatch.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the account a run outcome is reported under.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here parses what a saved-variables file holds.",
    },
  ],
} as const satisfies Module
