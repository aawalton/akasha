import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lostTreasureSettings = {
  id: "01a06141-8006-7fe1-bd04-6162a2b698c0",
  type: "page-type/module",
  slug: "lost-treasure-settings",
  definition: "the add-on's own panel in the game's settings menu",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel shows no author or version line, as Temper's other panels do not.",
    },
  ],
  createdAt: "2026-09-02T08:34:37.702Z",
  updatedAt: "2026-10-18T19:47:54.825Z",
} as const satisfies Module
