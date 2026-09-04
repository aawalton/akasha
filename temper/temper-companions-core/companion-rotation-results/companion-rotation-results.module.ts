import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionRotationResults = {
  id: "01a06152-c2cf-7e15-a652-e564d4083d72",
  pageTypeSlug: "module",
  slug: "companion-rotation-results",
  definition: "the totals a finished companion rotation adds up to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Damage is totalled from extracted formula components rather than from timeline events.",
    },
    { invariantKind: "gap", statement: "The returned timeline is always empty." },
    {
      invariantKind: "constraint",
      statement: "Uptime past the end of the cycle is trimmed off before the ratio is taken.",
    },
  ],
} as const satisfies Module
