import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionEquipmentSlots = {
  id: "01a06152-c2c7-7073-b355-b0dfada463c2",
  pageTypeSlug: "module",
  slug: "companion-equipment-slots",
  definition: "trait and quality mutations over the companion equipment slot map",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The next-empty-trait helper throws when no slot carries the no-trait value.",
    },
    {
      invariantKind: "constraint",
      statement: "The search for an empty trait slot visits armor before jewelry before weapons.",
    },
    {
      invariantKind: "constraint",
      statement: "Only ring-1 and ring-2 are eligible for the legendary quality bump.",
    },
  ],
} as const satisfies Module
