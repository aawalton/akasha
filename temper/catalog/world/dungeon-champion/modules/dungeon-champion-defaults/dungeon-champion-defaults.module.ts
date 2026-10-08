import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dungeonChampionDefaults = {
  id: "01a060f9-babf-7752-94d6-6bcff526e895",
  type: "page-type/module",
  slug: "dungeon-champion-defaults",
  definition: "what a player who has changed no setting sees",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A filter is on until a player turns the filter off.",
    },
  ],
  createdAt: "2026-09-02T07:16:14.143Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies Module
