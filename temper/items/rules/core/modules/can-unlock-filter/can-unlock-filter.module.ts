import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const canUnlockFilter = {
  id: "01a06100-3be8-751b-bf3a-5525027297a8",
  type: "page-type/module",
  slug: "can-unlock-filter",
  definition: "the Can Unlock condition a rule may have, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `canUnlock` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter is shown under its condition field page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter's options are its condition field's value pages.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.424Z",
  updatedAt: "2026-09-27T10:48:37.000Z",
} as const satisfies Module
