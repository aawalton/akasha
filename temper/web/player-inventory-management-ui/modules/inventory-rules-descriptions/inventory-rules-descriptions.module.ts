import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDescriptions = {
  id: "01a0636c-5d9b-7e6e-8126-0ea817bf001f",
  type: "page-type/module",
  slug: "inventory-rules-descriptions",
  definition: "the sentence a reader is given for a rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule over every category is named by the item category tree's all page.",
    },
  ],
} as const satisfies Module
