import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryManagementPlanTypes = {
  id: "01a06151-370a-7582-a557-5052447bbc7c",
  type: "page-type/module",
  slug: "inventory-management-plan-types",
  definition: "the shape of a management plan, of the stops it makes and of the steps at each",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A plan is a list of venue stops with the actions taken at that stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character session gathers the venue stops one character makes before the next takes over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plan item carries the stack size the holdings read beside its units.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group's, a stop's, a session's and a plan's count are counts of stacks.",
    },
  ],
  createdAt: "2026-09-02T08:51:47.594Z",
  updatedAt: "2026-10-28T19:08:00.033Z",
} as const satisfies Module
