import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryRulesNoInventoryBody = {
  id: "01a0e2a7-26a7-7d3d-a007-aec4f7a9559f",
  type: "page-type/temper-web-phrase",
  slug: "inventory-rules-no-inventory-body",
  title: "Where inventory comes from",
  description:
    "Inventory comes from the file the TemperItems add-on writes while you play, and the Watcher syncs that file for you. The starter rules below are inactive; enable the ones you want once your inventory arrives.",
} as const satisfies TemperWebPhrase
