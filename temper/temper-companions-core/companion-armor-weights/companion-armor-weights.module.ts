import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionArmorWeights = {
  id: "01a06108-0763-7147-bd41-21baa914acb5",
  pageTypeSlug: "module",
  slug: "companion-armor-weights",
  definition: "the weight classes a companion's body armor is made in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This module names the armor weights without naming any order among the armor weights.",
    },
  ],
} as const satisfies Module
