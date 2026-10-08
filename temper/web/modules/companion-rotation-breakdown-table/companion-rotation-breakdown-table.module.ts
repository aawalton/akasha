import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionRotationBreakdownTable = {
  id: "01a0642f-8c31-7b23-b59d-0aadb80151ff",
  type: "page-type/module",
  slug: "companion-rotation-breakdown-table",
  definition: "the table drawing each row of a companion's rotation breakdown",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:13:52.817Z",
  updatedAt: "2026-09-27T11:57:08.000Z",
} as const satisfies Module
