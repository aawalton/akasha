import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mundusSource = {
  id: "01a061a7-9bb1-778e-b38f-f397e2f754ea",
  type: "page-type/module",
  slug: "mundus-source",
  definition: "the boon each mundus stone gives a character, and what divines armor adds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A mundus stone's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A mundus stone moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["MUNDUS_DATA"],
} as const satisfies Module
