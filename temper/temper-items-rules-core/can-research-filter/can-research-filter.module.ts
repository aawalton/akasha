import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const canResearchFilter = {
  id: "01a06100-3be7-745e-96c2-26bc05aa5740",
  pageTypeSlug: "module",
  slug: "can-research-filter",
  definition: "the Can Research condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `canResearch` condition alone.",
    },
    {
      invariantKind: "departure",
      statement: "A category outside `equipment` is offered no Can Research condition.",
    },
  ],
} as const satisfies Module
