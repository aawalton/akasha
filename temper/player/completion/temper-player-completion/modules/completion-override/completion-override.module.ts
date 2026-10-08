import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionOverride = {
  id: "01a06103-061b-7457-afea-60b18bad59f0",
  type: "page-type/module",
  slug: "completion-override",
  definition: "a floor a player sets by hand under an item of a completion card",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
  createdAt: "2026-09-02T07:26:23.259Z",
  updatedAt: "2026-09-22T10:19:25.000Z",
} as const satisfies Module
