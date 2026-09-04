import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDebugLogger = {
  id: "01a06275-c447-7b94-9fb0-c81968ff4107",
  pageTypeSlug: "module",
  slug: "scrollable-menu-debug-logger",
  definition: "the log sink that resolves a numeric message id and routes it by log type",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "LibDebugLogger is an optional dependency.",
    },
    {
      invariantKind: "departure",
      statement: "Output falls back to the chat frame when no logger is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "Verbose messages are dropped entirely when no logger is loaded.",
    },
    {
      invariantKind: "constraint",
      statement: "A message whose id has no pattern produces nothing.",
    },
  ],
} as const satisfies Module
