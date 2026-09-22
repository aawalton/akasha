import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemFacts = {
  id: "01a06137-f96c-7332-b371-6a8536a60c01",
  type: "page-type/module",
  slug: "item-facts",
  definition: "the per-item signals evaluating a compiled inventory rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An item facts record requires itemId and itemName and itemLink and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absent field means the signal is unknown rather than meaning false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The category chain arrives already flattened into an array of node ids.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here describes a character or a rule or the wider inventory.",
    },
  ],
} as const satisfies Module
