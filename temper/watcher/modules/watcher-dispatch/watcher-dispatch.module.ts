import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherDispatch = {
  id: "01a063c7-b03c-7191-b9c8-91abbe234ffd",
  type: "page-type/module",
  slug: "watcher-dispatch",
  definition: "the imports and exports carrying each kind of saved-variables file across",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind of file names its handler in a record rather than in a chain of branches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind of file the record names no handler for is refused by the compiler.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import operation takes the name the run-observing table gives that operation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The signed-in reader is handed in by the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every import and export function a handler calls may be handed in by the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where the source file sits may be handed in rather than read off the watcher config.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The characters export is held back where a characters import is not synced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The inventory import finishes before the settings export starts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An export that throws fails its own operation alone, carrying what it said, and writes no side file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The companions import runs beside the companion-builds export.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The characters file is written back nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run with no operation is reported nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A throw comes back as a result carrying the message rather than reaching the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account a run is reported under is read from the signed-in reader.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the kinds of file the watcher knows.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here exports the type naming a kind of file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches for a shared signed-in reader.",
    },
  ],
} as const satisfies Module
