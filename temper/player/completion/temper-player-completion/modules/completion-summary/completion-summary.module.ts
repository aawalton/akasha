import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionSummary = {
  id: "01a063a1-6ec2-7027-8d27-e1641844f7dc",
  type: "page-type/module",
  slug: "completion-summary",
  definition: "the numbers a character's summary card shows, folded from that character's progress",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The progress folded here arrives in one bundle rather than as separate arguments.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a catalog.",
    },
  ],
} as const satisfies Module
