import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const armorSlots = {
  id: "01a060b8-08c4-79bd-a673-660169cf2ee9",
  pageTypeSlug: "module",
  slug: "armor-slots",
  definition: "the seven body positions an armor piece is worn at",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An armor slot's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "An armor slot moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
