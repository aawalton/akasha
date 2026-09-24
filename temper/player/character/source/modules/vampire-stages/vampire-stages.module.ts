import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const vampireStages = {
  id: "01a060ea-ac65-780c-876f-8ff34a264cc4",
  type: "page-type/module",
  slug: "vampire-stages",
  definition: "the five stages of vampirism, each feeding a character more penalty",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the character pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A vampire stage's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A vampire stage moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["VAMPIRE_STAGE_DATA"],
} as const satisfies Module
