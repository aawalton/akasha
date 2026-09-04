import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoCompanionEquipmentConstantsData = {
  id: "01a060d9-498b-7d49-9f36-43409f335af9",
  pageTypeSlug: "module",
  slug: "eso-companion-equipment-constants-data",
  definition: "the numbers the game gives companion equip types and companion gear qualities",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "These numbers were written out from the companion equipment constant pages.",
    },
    {
      invariantKind: "absence",
      statement: "No name here is taken from the game at runtime.",
    },
  ],
} as const satisfies Module
