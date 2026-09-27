import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryTabNoInventoryData = {
  id: "01a0e2a5-ce6c-774c-bb31-cf02eee48f9a",
  type: "page-type/temper-web-phrase",
  slug: "inventory-tab-no-inventory-data",
  title: "No inventory data yet",
  description:
    "Temper has not received any inventory data for this account, so it has nothing to list here yet. Inventory reaches Temper through the",
} as const satisfies TemperWebPhrase
