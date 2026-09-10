import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSupportBaseline = {
  id: "01a06152-c2d6-735f-b4cd-3686f61269aa",
  pageTypeSlug: "module",
  slug: "companion-support-baseline",
  definition: "reference baseline of buff uptimes and damage multipliers for a companion build",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The baseline computation passes EMPTY_BASELINE into the stats calculator.",
    },
    {
      invariantKind: "constraint",
      statement: "Light attack is excluded from the per-skill buff scan.",
    },
    {
      invariantKind: "gap",
      statement: "A missing health maximum metric falls back to thirty thousand.",
    },
  ],
} as const satisfies Module
