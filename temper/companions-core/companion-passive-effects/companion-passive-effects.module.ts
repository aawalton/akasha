import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionPassiveEffects = {
  id: "01a06152-c2ce-7902-aff0-c78fd3c8b657",
  pageTypeSlug: "module",
  slug: "companion-passive-effects",
  definition: "the metric effects a companion's passive skill grants",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The passive effect's modifier type is carried over as the metric effect type.",
    },
    { invariantKind: "constraint", statement: "A skill that is not passive yields no effects." },
  ],
} as const satisfies Module
