import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompanionShoppingData = {
  id: "01a063a1-8cc1-7010-8b74-d5f6fa0b08d5",
  type: "page-type/module",
  slug: "use-companion-shopping-data",
  definition: "the companion gear needs and prices a player's shopping reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A player's own builds are the ones naming the address of that player's account.",
    },
  ],
} as const satisfies Module
