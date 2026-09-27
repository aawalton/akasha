import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buyShortfall = {
  id: "01a060d9-44c8-7b58-864b-b81a0c27cbac",
  type: "page-type/module",
  slug: "buy-shortfall",
  definition: "how far short of a target quantity what is held falls",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A shortfall never falls below zero.",
    },
  ],
} as const satisfies Module
