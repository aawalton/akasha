import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const curses = {
  id: "01a060ea-ac61-790f-9c2c-5f742647198c",
  type: "page-type/module",
  slug: "curses",
  definition: "the curse a character has, vampire or werewolf or neither",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the character pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A curse's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A curse moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["CURSE_DATA"],
} as const satisfies Module
