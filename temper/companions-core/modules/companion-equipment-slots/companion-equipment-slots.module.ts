import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEquipmentSlots = {
  id: "01a06152-c2c7-7073-b355-b0dfada463c2",
  type: "module",
  slug: "companion-equipment-slots",
  definition: "trait and quality mutations over the companion equipment slot map",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The next-empty-trait helper throws when no slot has the no-trait value.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The search for an empty trait slot visits armor before jewelry before weapons.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Only ring-1 and ring-2 are eligible for the legendary quality bump.",
    },
  ],
} as const satisfies Module
