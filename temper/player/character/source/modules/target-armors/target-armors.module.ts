import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetArmors = {
  id: "01a060ea-ac64-73f9-9faf-71788fd4b609",
  type: "page-type/module",
  slug: "target-armors",
  definition: "the armor a practice target carries, dungeon or overland",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each target armor is read from its own temper-target-armor page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The companion catalogue and the stat catalogue each hold the target armors they read.",
    },
  ],
} as const satisfies Module
