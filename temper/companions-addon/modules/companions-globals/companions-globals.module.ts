import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsGlobals = {
  id: "01a0611d-84dc-7ccb-8d6e-224471379bbc",
  type: "page-type/module",
  slug: "companions-globals",
  definition: "the two names the add-on hangs off the game's global table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only refreshing and clearing are reachable from outside.",
    },
  ],
} as const satisfies Module
