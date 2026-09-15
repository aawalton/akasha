import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherLogLine = {
  id: "01a06039-9c89-7ba8-aee4-a339fadf4824",
  type: "module",
  slug: "watcher-log-line",
  definition: "one line of a temper watcher log read as its time, its level and its message",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker and the tray each write their own line shape.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reader says which of the two that reader is reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line opens with the time the line was written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That time is written in UTC.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The worker writes that time to the millisecond and the tray to the second.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The level follows the time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rest of the line is the message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line the shape does not fit is answered as nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
