import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchRangeValueParse = {
  id: "01a0613a-e0ac-785c-a9b6-1aa6dca2564d",
  type: "page-type/module",
  slug: "search-range-value-parse",
  definition:
    "the narrowing of an unknown saved value into a number with an optional comparison operator",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "parseRangeValue returns undefined when the raw value has no numeric value field.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The accepted operators are the six comparison operators the rule layer names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No default operator is supplied here.",
    },
  ],
} as const satisfies Module
