import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryTabLoadFailed = {
  id: "01a0e2a5-ce6c-744b-8d99-021f2beeaa21",
  type: "page-type/temper-web-phrase",
  slug: "inventory-tab-load-failed",
  title: "Couldn't load your inventory",
  description:
    "Temper could not read your inventory data just now, so it cannot tell which guild banks you have. This is a fault on Temper's side — not your game, and not your add-ons. Reloading the page will try again.",
} as const satisfies TemperWebPhrase
