import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const requiredCurseStateFilter = {
  id: "01a06100-3bf8-73ef-a10e-397900927cf5",
  pageTypeSlug: "module",
  slug: "required-curse-state-filter",
  definition: "the Required Curse State condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `requiredCurseState` condition alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule whose action is other than `stock` is offered no Required Curse State condition.",
    },
  ],
} as const satisfies Module
