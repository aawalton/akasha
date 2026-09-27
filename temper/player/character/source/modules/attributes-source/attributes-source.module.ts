import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const attributesSource = {
  id: "01a060ea-ac5d-72ee-938f-bff339b0ed37",
  type: "page-type/module",
  slug: "attributes-source",
  definition: "the health, magicka or stamina an attribute point buys",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Attributes are read from their temper-attribute pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The attribute pages are held wherever the skill catalogue is held.",
    },
  ],
} as const satisfies Module
