import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkFlags = {
  id: "01a06137-f965-79e3-938a-957ed9482203",
  type: "page-type/module",
  slug: "check-flags",
  definition: "the condition check over the eleven boolean flags an item has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every flag condition has a positive form and a negated form.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A flag absent from the item facts makes the condition indeterminate rather than false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first flag that fails ends the flag check.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No flag condition consults the evaluation environment.",
    },
  ],
  createdAt: "2026-09-02T08:24:13.413Z",
  updatedAt: "2026-10-28T18:42:46.817Z",
} as const satisfies Module
