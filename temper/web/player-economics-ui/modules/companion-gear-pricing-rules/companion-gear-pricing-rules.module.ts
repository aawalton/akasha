import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionGearPricingRules = {
  id: "01a063a1-8cc1-7003-97fa-84c90d755406",
  type: "page-type/module",
  slug: "companion-gear-pricing-rules",
  definition: "what a companion gear need is called and what it costs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A gear name and a gold amount are worded by phrase pages the caller's phrase reads.",
    },
  ],
} as const satisfies Module
