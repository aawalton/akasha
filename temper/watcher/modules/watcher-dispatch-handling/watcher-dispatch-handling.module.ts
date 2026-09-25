import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherDispatchHandling = {
  id: "01a063c7-b064-74a3-9ffc-0be1edaadd02",
  type: "page-type/module",
  slug: "watcher-dispatch-handling",
  definition: "a change to a watched file turned into a dispatch of that file's content",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change arriving while a run of the same file is in progress is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change arriving before the debounce has elapsed is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The debounce is measured from when the last run began rather than from when that run ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The clock the debounce reads is handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run is handed to a queue rather than awaited here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that never settles is reported as skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file absent from disk is reported as not found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Content matching the last write-back is dropped rather than dispatched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Content whole at neither end is reported as a parse failure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file already broken is dispatched anyway, so a write-back can replace it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write-back whole at neither end is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write-back is refused where the file changed after the stable read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The dispatch this handler calls is handed in rather than imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which side file a kind of file has is read off the operation targets rather than branched on here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A side file config path key is derived from that side file's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A side file hash the dispatch answers is remembered against the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A throw inside the run is logged rather than raised.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that ends leaves the file marked as no longer running.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the account a run outcome is reported under.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here parses the content a saved-variables file has.",
    },
  ],
} as const satisfies Module
