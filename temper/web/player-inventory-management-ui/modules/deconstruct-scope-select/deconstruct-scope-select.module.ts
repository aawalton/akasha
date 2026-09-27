import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deconstructScopeSelect = {
  id: "01a0636c-5d97-7c22-964b-407b1edd000a",
  type: "page-type/module",
  slug: "deconstruct-scope-select",
  definition: "the select naming whose items a deconstruct rule reaches",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Deconstruct modes are named from deconstruct mode pages.",
    },
  ],
} as const satisfies Module
