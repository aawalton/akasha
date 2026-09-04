import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionWeaponSlots = {
  id: "01a06108-076f-7a7e-8d7f-1f243e2ec818",
  pageTypeSlug: "module",
  slug: "companion-weapon-slots",
  definition: "the two hands a companion holds a weapon in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
