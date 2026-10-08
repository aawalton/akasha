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
  createdAt: "2026-09-02T22:10:23.761Z",
  updatedAt: "2026-09-27T11:34:37.000Z",
} as const satisfies Module
