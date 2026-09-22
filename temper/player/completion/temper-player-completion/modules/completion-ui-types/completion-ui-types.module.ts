import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionUiTypes = {
  id: "01a06121-f0d6-7727-b05d-aa9ca5f7c0f6",
  type: "page-type/module",
  slug: "completion-ui-types",
  definition: "the shapes the completion window uses for a player's progress",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
