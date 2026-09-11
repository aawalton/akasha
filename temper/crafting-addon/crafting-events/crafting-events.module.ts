import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const craftingEvents = {
  id: "01a061c7-e876-7965-825f-15ded168bab6",
  type: "module",
  slug: "crafting-events",
  definition: "what the add-on does when the game says it has loaded",
  code: "ts",
} as const satisfies Module
