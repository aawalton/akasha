import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryTabDataUnreadable = {
  id: "01a0e2a5-ce6c-739d-94d1-0f4c26f5d019",
  type: "page-type/temper-web-phrase",
  slug: "inventory-tab-data-unreadable",
  title: "Your inventory data could not be read",
  description:
    "Temper has an inventory reading for this account but could not reassemble it, so it cannot tell which guild banks are in it. The data arrived — reading it is what failed, which is Temper's fault rather than your game's. A fresh sync will replace the reading.",
} as const satisfies TemperWebPhrase
