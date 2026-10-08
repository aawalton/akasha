import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const soloDifficulty = {
  id: "01a06031-70e5-71b7-aa04-ac3deb2dfe1c",
  type: "page-type/module",
  slug: "solo-difficulty",
  definition: "how hard a player alone finds a dungeon",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dungeon saying nothing of its difficulty is taken as hard.",
    },
  ],
  createdAt: "2026-09-02T03:37:28.037Z",
  updatedAt: "2026-09-22T10:08:29.000Z",
} as const satisfies Module
