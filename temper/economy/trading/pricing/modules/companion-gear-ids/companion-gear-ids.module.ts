import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionGearIds = {
  id: "01a060bf-747d-7dee-bf58-1559bc114b90",
  type: "page-type/module",
  slug: "companion-gear-ids",
  definition: "the trait and the quality naming a piece of companion equipment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every id here names one page under `temper-companions`.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "`@akasha/temper-companions-core` has a second table of these same ids.",
    },
  ],
} as const satisfies Module
