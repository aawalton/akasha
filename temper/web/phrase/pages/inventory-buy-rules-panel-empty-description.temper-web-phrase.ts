import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryBuyRulesPanelEmptyDescription = {
  id: "01a0e2a7-d437-7183-9452-67a72485a951",
  type: "page-type/temper-web-phrase",
  slug: "inventory-buy-rules-panel-empty-description",
  title:
    "Buy rules maintain a global target quantity of an item by acquiring the shortfall at a source. New rules start inactive — activate one to let it spend gold.",
} as const satisfies TemperWebPhrase
