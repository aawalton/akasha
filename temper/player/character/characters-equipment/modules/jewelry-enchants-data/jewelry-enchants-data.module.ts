import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jewelryEnchantsData = {
  id: "01a0616f-8e14-79ec-a8cd-c4989b33053d",
  type: "page-type/module",
  slug: "jewelry-enchants-data",
  definition: "the table of jewelry glyphs, kept apart from the module that reads the table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is written out from the glyph pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is a file of its own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A glyph's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A glyph moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["TEMPER_JEWELRY_ENCHANTS_BY_ID"],
} as const satisfies Module
