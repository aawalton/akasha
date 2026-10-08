import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const neededForTargetCompanionBuildFilter = {
  id: "01a06100-3bf4-72f6-a7c9-02cf378c255f",
  type: "page-type/module",
  slug: "needed-for-target-companion-build-filter",
  definition:
    "the Needed for Target Companion Build condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `isTargetCompanionEquip` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter is shown under its condition field page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A category outside `companion` is offered no Needed for Target Companion Build condition.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.436Z",
  updatedAt: "2026-09-27T10:07:00.000Z",
} as const satisfies Module
