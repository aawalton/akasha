import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dungeonChampionPinRegister = {
  id: "01a060f9-bacb-7522-90b0-6722aa981410",
  pageTypeSlug: "module",
  type: "module",
  slug: "dungeon-champion-pin-register",
  definition: "telling LibMapPins and the compass what a champion pin looks like",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A compass pin shrinks as the compass pin moves away from the center.",
    },
  ],
} as const satisfies Module
