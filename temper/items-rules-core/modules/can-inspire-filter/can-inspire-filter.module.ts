import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const canInspireFilter = {
  id: "01a06100-3be6-79c6-a993-675a57105c50",
  type: "module",
  slug: "can-inspire-filter",
  definition: "the Can Inspire condition a rule may have, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `canInspire` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A category outside the two roots named in the code is offered no Can Inspire condition.",
    },
  ],
} as const satisfies Module
