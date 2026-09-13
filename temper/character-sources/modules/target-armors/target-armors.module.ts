import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const targetArmors = {
  id: "01a060ea-ac64-73f9-9faf-71788fd4b609",
  type: "module",
  slug: "target-armors",
  definition: "the armor a practice target carries, dungeon or overland",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the character pages rather than by hand.",
    },
  ],
} as const satisfies Module
