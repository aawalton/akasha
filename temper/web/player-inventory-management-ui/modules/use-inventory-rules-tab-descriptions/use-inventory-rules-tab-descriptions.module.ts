import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useInventoryRulesTabDescriptions = {
  id: "01a0636c-5da1-74ed-a270-389ba82d0067",
  type: "page-type/module",
  slug: "use-inventory-rules-tab-descriptions",
  definition: "the sentence the rules tab gives for each rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's sentence is written again when the item action page titles change.",
    },
  ],
} as const satisfies Module
