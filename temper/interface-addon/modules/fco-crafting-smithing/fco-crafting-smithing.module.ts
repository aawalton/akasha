import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const fcoCraftingSmithing = {
  id: "01a06115-1ac7-7093-bdbd-2f2d354a8b32",
  type: "module",
  slug: "fco-crafting-smithing",
  definition: "the smithing creation panel the interface tweaks change",
  code: "ts",
  invariants: [
    { invariantKind: "absence", statement: "No shared guard stands behind the guards here." },
  ],
} as const satisfies Module
