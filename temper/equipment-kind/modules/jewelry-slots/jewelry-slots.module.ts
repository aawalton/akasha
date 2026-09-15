import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jewelrySlots = {
  id: "01a060b8-08c5-7b3b-a995-798d59d45760",
  type: "module",
  slug: "jewelry-slots",
  definition: "the necklace and the two ring positions a character wears jewelry at",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A jewelry slot's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A jewelry slot moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
