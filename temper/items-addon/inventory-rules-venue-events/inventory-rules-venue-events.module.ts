import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryRulesVenueEvents = {
  id: "01a06258-b533-7f78-940d-85d72d5b088f",
  type: "module",
  slug: "inventory-rules-venue-events",
  definition: "the events that fire a dispatch when a bank, store, station or mailbox opens",
  code: "ts",
} as const satisfies Module
