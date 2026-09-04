import type { Module } from "@akasha/code-system/module"

export const inventoryWritCraftingQueue = {
  id: "01a06258-b536-712e-9550-52d00f78c679",
  pageTypeSlug: "module",
  slug: "inventory-writ-crafting-queue",
  definition: "the queue of craft requests, worked one at a time as each craft completes",
  code: "ts",
} as const satisfies Module
