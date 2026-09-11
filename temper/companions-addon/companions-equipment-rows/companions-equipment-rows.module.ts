import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const companionsEquipmentRows = {
  id: "01a0611d-84d8-7602-83da-54ad2d53b4dd",
  type: "module",
  slug: "companions-equipment-rows",
  definition: "the controls one gear section of the equipment panel is drawn from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Column positions are fixed numbers rather than measured from content.",
    },
  ],
} as const satisfies Module
