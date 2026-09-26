import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoPlusSource = {
  id: "01a060ea-ac63-7845-9a82-f9f16acf19da",
  type: "page-type/module",
  slug: "eso-plus-source",
  definition: "the tenth an ESO Plus subscription adds to what a character earns",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "ESO Plus is read from its temper-eso-plus pages, in the order of their hash places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ESO Plus pages are held wherever the skill catalogue is held.",
    },
  ],
} as const satisfies Module
