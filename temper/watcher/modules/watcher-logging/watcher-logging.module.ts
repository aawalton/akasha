import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherLogging = {
  id: "01a0633f-8d1e-79dd-b620-f4a7e7e43bb1",
  type: "page-type/module",
  slug: "watcher-logging",
  definition: "how the watcher worker writes its log and rolls the log over once it grows large",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line opens with the time in UTC to the millisecond.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The message follows the level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line the worker writes is a line the log reader parses back whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The worker writes only the two levels the log reader admits from a worker.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A log grown to the largest size allowed is rolled over before the next write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roll is renamed from the highest number downward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The roll that would exceed the count kept is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The log file takes the name the daemon page gives rather than a name written again here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure to write the log leaves the worker running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line reaches the terminal only where the worker runs attached to a terminal.",
    },
  ],
  createdAt: "2026-09-02T17:51:44.414Z",
  updatedAt: "2026-09-15T18:43:51.000Z",
} as const satisfies Module
