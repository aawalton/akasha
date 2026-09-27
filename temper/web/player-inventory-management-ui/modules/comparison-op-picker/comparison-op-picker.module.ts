import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const comparisonOpPicker = {
  id: "01a0636c-5d97-7635-8e9c-cc6653c00009",
  type: "page-type/module",
  slug: "comparison-op-picker",
  definition: "the picker choosing how a rule's condition compares",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The picker's accessible name is a web phrase page filled with the operator.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each operator is shown by its comparison op page's title, found by key.",
    },
  ],
} as const satisfies Module
