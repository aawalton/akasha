import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryCategoryRulesPanelResetKeepsLocked = {
  id: "01a0e2a3-3cc3-79d8-b350-abcfcd83da51",
  type: "page-type/temper-web-phrase",
  slug: "inventory-category-rules-panel-reset-keeps-locked",
  title:
    "This will reset all unlocked category rules to their defaults. Locked rules will be preserved.",
} as const satisfies TemperWebPhrase
