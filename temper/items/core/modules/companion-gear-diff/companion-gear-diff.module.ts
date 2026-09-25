import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionGearDiff = {
  id: "01a0626e-3e05-7e6d-98ef-c71fb6d1a1cb",
  type: "page-type/module",
  slug: "companion-gear-diff",
  definition: "the gear a companion's target build wants and the account does not hold",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An equip type or game quality is read off its companion equipment constant page.",
    },
  ],
} as const satisfies Module
