import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const inventoryCategoryRulesPanelResetAll = {
  id: "01a0e2a3-3cc3-7bce-a08d-b9e4e577e539",
  type: "page-type/temper-web-phrase",
  slug: "inventory-category-rules-panel-reset-all",
  title: "This will reset all category rules to their defaults. Custom rules will be lost.",
} as const satisfies TemperWebPhrase
