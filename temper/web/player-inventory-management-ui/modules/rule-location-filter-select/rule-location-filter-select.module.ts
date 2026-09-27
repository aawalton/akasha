import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleLocationFilterSelect = {
  id: "01a0636c-5da1-76d9-9b50-ab56b332005d",
  type: "page-type/module",
  slug: "rule-location-filter-select",
  definition: "the select narrowing rules by the location they cover",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Location type names are read from the location type pages, which title them singly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The choice of every location of a type reads Any and that type's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That choice and the type placeholder are worded by web phrase pages.",
    },
  ],
} as const satisfies Module
