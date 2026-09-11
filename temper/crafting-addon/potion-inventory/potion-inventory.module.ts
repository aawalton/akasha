import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const potionInventory = {
  id: "01a061c7-e87f-702b-9dc2-9232a71a77ba",
  type: "module",
  slug: "potion-inventory",
  definition: "the reagents and solvents the player is carrying",
  code: "ts",
} as const satisfies Module
