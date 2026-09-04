import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const weaponSlotAccess = {
  id: "01a0616f-8e18-7b28-8180-88c556ae463d",
  pageTypeSlug: "module",
  slug: "weapon-slot-access",
  definition: "what a weapon slot holds, and whether the slot shows at all",
  code: "ts",
} as const satisfies Module
