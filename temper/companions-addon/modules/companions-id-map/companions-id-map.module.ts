import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsIdMap = {
  id: "01a0611d-84dd-7991-bda4-54827db48eac",
  type: "page-type/module",
  slug: "companions-id-map",
  definition: "which index the build codec gives each companion the game knows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A companion's index here is the index a saved build hash carries.",
    },
  ],
} as const satisfies Module
