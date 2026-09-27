import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryItemRulesPanelResetAll = {
  id: "01a0e2a6-f43e-7edc-9863-c07acab3c4a8",
  type: "page-type/temper-web-phrase",
  slug: "inventory-item-rules-panel-reset-all",
  title: "This will remove all item-specific overrides. This action cannot be undone.",
} as const satisfies TemperWebPhrase
