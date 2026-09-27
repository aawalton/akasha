import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersFilterBar = {
  id: "01a0642c-5b91-7552-a4e9-13ef137473fd",
  type: "page-type/module",
  slug: "characters-filter-bar",
  definition: "the bar filtering characters",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
