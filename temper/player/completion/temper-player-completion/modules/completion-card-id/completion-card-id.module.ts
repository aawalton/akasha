import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCardId = {
  id: "01a06103-061b-7c11-a311-6a30a8548331",
  type: "page-type/module",
  slug: "completion-card-id",
  definition: "the identity of a completion card, over every tab the category tree holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every card identifier is read off the category tree rather than named here.",
    },
  ],
  createdAt: "2026-09-02T07:26:23.259Z",
  updatedAt: "2026-09-22T00:32:31.000Z",
} as const satisfies Module
