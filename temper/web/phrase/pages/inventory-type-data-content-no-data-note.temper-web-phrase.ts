import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryTypeDataContentNoDataNote = {
  id: "01a0e2a9-871e-758a-bbf4-f994e72b8d2f",
  type: "page-type/temper-web-phrase",
  slug: "inventory-type-data-content-no-data-note",
  title:
    "No inventory has reached this page for your account. Inventory comes from the file the TemperItems add-on writes while you play, and the Watcher syncs that file for you.",
} as const satisfies TemperWebPhrase
