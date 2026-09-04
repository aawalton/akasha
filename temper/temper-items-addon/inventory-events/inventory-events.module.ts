import type { Module } from "@akasha/code-system/module"

export const inventoryEvents = {
  id: "01a06258-b52b-7a61-a1ab-0439cd103604",
  pageTypeSlug: "module",
  slug: "inventory-events",
  definition: "the game events the add-on listens to, and what each one refreshes",
  code: "ts",
} as const satisfies Module
