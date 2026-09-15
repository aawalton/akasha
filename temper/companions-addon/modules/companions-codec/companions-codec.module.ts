import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsCodec = {
  id: "01a0611d-84d0-7a02-930a-0f62bfef9dcc",
  type: "page-type/module",
  slug: "companions-codec",
  definition: "reading a companion's gear and skills off the game and writing them out as a hash",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty slot is written as index zero rather than left out.",
    },
  ],
} as const satisfies Module
