import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dungeonChampionStart = {
  id: "01a060f9-badc-70b2-a9a4-5672a001af3e",
  type: "page-type/module",
  slug: "dungeon-champion-start",
  definition: "bringing the addon up once the game has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Settings are brought up before pins are registered.",
    },
  ],
  createdAt: "2026-09-02T07:16:14.172Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies Module
