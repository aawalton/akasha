import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionArmorSlots = {
  id: "01a06108-0761-7fc9-97df-bfad364def9c",
  pageTypeSlug: "module",
  slug: "companion-armor-slots",
  definition: "every place on a companion a piece of body armor is worn",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
