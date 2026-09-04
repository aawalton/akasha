import type { Module } from "@akasha/code-system/module"

export const inventoryQuestAnnotations = {
  id: "01a06258-b52e-7489-8c9a-a72b0b2902a1",
  pageTypeSlug: "module",
  slug: "inventory-quest-annotations",
  definition: "remembering which container came from which quest, so cooldowns can be judged",
  code: "ts",
} as const satisfies Module
