import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const buyRuleSummary = {
  id: "01a0e2ab-af02-7bc5-b6db-9257c1e2c2a3",
  type: "page-type/temper-rule-card-phrase",
  slug: "buy-rule-summary",
  title: "{title} — Buy {quantity} at {venue}",
  key: "buy-rule-summary",
  displayOrder: 65,
} as const satisfies TemperRuleCardPhrase
