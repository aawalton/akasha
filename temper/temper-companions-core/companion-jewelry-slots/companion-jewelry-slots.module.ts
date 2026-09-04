import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionJewelrySlots = {
  id: "01a06108-0768-71aa-84ff-35a84fc802c0",
  pageTypeSlug: "module",
  slug: "companion-jewelry-slots",
  definition: "every place on a companion a piece of jewelry is worn",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
