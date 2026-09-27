import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryItemRulesPanelResetKeepsLocked = {
  id: "01a0e2a6-f43e-7e68-b4b4-47d2ee876cc0",
  type: "page-type/temper-web-phrase",
  slug: "inventory-item-rules-panel-reset-keeps-locked",
  title: "This will remove all unlocked item-specific overrides. Locked rules will be preserved.",
} as const satisfies TemperWebPhrase
