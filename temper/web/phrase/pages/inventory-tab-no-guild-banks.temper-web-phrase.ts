import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryTabNoGuildBanks = {
  id: "01a0e2a5-ce6c-7ecc-85c9-348c9b32597a",
  type: "page-type/temper-web-phrase",
  slug: "inventory-tab-no-guild-banks",
  title: "No guild banks in your inventory data",
  description:
    "Your inventory data reached Temper and contains no guild banks. TemperItems can only record a guild bank once you have opened it in game, so a bank you have not opened since installing the add-on will not be here yet.",
  createdAt: "2026-09-27T11:35:12.236Z",
  updatedAt: "2026-09-27T11:35:19.000Z",
} as const satisfies TemperWebPhrase
