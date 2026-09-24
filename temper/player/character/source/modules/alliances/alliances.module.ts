import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alliances = {
  id: "01a060ea-ac5c-7ddc-8beb-424cc85a9621",
  type: "page-type/module",
  slug: "alliances",
  definition: "the three alliances a character fights for, and no alliance at all",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the character pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A alliance's place in this table is the index a build hash has.",
    },
  ],
  hashIndexed: ["ALLIANCE_DATA"],
} as const satisfies Module
