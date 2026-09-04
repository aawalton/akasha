import type { Module } from "@akasha/code-system/module"

export const completionSummary = {
  id: "01a063a1-6ec2-7027-8d27-e1641844f7dc",
  pageTypeSlug: "module",
  slug: "completion-summary",
  definition:
    "the numbers one character's summary card shows, folded from that character's progress",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The progress folded here arrives in one bundle rather than as separate arguments.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a catalog.",
    },
  ],
} as const satisfies Module
