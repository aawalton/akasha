import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDebugLogMessagePatterns = {
  id: "01a06275-c447-77e7-8ff2-b52861a169f3",
  pageTypeSlug: "module",
  slug: "scrollable-menu-debug-log-message-patterns",
  definition: "the numbered format strings the debug log looks up by message id",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Log text is addressed by integer rather than by name.",
    },
    {
      invariantKind: "constraint",
      statement: "The table is a flat map from number to format string.",
    },
    {
      invariantKind: "constraint",
      statement: "Every id from 1 to 197 names a pattern.",
    },
  ],
} as const satisfies Module
