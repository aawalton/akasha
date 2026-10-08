import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uncollectedFilter = {
  id: "01a11bee-2aab-7c89-be6d-b254a85229b8",
  type: "page-type/module",
  slug: "uncollected-filter",
  definition: "the `uncollected` condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `uncollected` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category outside `equipment` is offered no `uncollected` condition.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An uncollected item is an unbound set piece the account's set collection lacks.",
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
} as const satisfies Module
