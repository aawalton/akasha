import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stockScopeSelect = {
  id: "01a0636c-5da1-709a-aeb3-f652e1390060",
  type: "page-type/module",
  slug: "stock-scope-select",
  definition: "the select naming how much of an item a rule keeps",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Character and Bank are location type and venue pages; the rest are rule card phrases.",
    },
  ],
} as const satisfies Module
