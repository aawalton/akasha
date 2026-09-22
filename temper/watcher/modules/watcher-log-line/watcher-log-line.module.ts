import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherLogLine = {
  id: "01a06039-9c89-7ba8-aee4-a339fadf4824",
  type: "page-type/module",
  slug: "watcher-log-line",
  definition: "a line of a temper watcher log read as its time, its level and its message",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The worker and the tray each write their own line shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader says which of the two that reader is reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line opens with the time the line was written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That time is written in UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The worker writes that time to the millisecond and the tray to the second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The level follows the time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rest of the line is the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line the shape does not fit is answered as nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
