import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const canInspireFilter = {
  id: "01a06100-3be6-79c6-a993-675a57105c50",
  pageTypeSlug: "module",
  slug: "can-inspire-filter",
  definition: "the Can Inspire condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `canInspire` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category outside the two roots named in the code is offered no Can Inspire condition.",
    },
  ],
} as const satisfies Module
