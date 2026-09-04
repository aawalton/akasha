import type { Module } from "@akasha/code-system/module"

export const debugLoggerLogHandler = {
  id: "01a06061-408f-7394-8aef-02461fccacdf",
  pageTypeSlug: "module",
  slug: "debug-logger-log-handler",
  definition: "how a message becomes an entry in the log and how the log is pruned",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A message repeating the one before it raises a count rather than adding an entry.",
    },
    {
      invariantKind: "departure",
      statement: "A string longer than the save limit is split into parts.",
    },
    {
      invariantKind: "departure",
      statement: "The log is pruned once it runs past the threshold.",
    },
    {
      invariantKind: "departure",
      statement: "A failed entry is written as a fallback entry rather than dropped.",
    },
  ],
} as const satisfies Module
