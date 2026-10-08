import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statChangesDescription = {
  id: "01a0642c-5b9e-7e2d-900f-e5523b61154d",
  type: "page-type/module",
  slug: "stat-changes-description",
  definition: "the description a set of stat changes becomes",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.774Z",
  updatedAt: "2026-09-27T11:45:20.000Z",
} as const satisfies Module
