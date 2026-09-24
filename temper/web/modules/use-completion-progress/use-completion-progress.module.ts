import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompletionProgress = {
  id: "01a06421-f74b-726d-a820-51afc5be003b",
  type: "page-type/module",
  slug: "use-completion-progress",
  definition: "the progress every completion tab is handed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether the catalogs have loaded is part of whether this module is loading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transform gives back zeros against an empty catalog rather than throwing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller reading before the catalogs arrive would show a real-looking zero per cent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Character and companion bodies are found by the address of the account page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An account ask answers at most one row.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The first body answered with is that account's.",
    },
  ],
} as const satisfies Module
