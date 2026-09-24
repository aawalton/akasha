import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoPlusSource = {
  id: "01a060ea-ac63-7845-9a82-f9f16acf19da",
  type: "page-type/module",
  slug: "eso-plus-source",
  definition: "the tenth an ESO Plus subscription adds to what a character earns",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A ESO Plus row's place in this table is the index a build hash has.",
    },
  ],
  hashIndexed: ["ESO_PLUS_DATA"],
} as const satisfies Module
