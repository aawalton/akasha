import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDebugLogger = {
  id: "01a06275-c447-7b94-9fb0-c81968ff4107",
  type: "page-type/module",
  slug: "scrollable-menu-debug-logger",
  definition: "the log sink that resolves a numeric message id and routes it by log type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "LibDebugLogger is an optional dependency.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Output falls back to the chat frame when no logger is loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Verbose messages are dropped entirely when no logger is loaded.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A message whose id has no pattern produces nothing.",
    },
  ],
} as const satisfies Module
