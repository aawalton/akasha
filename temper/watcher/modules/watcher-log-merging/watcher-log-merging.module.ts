import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherLogMerging = {
  id: "01a06039-9c89-7e8b-b406-28150d37543f",
  type: "module",
  slug: "watcher-log-merging",
  definition: "the worker's log lines and the tray's read together, newest first",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line older than the moment handed in is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line whose time is the moment handed in is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The newest line comes first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two lines written at one moment are ordered by the log each line came from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tray comes before the worker where the moment ties.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
