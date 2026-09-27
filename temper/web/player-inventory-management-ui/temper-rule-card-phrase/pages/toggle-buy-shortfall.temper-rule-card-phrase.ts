import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const toggleBuyShortfall = {
  id: "01a0e311-a63b-7d44-a8c2-c6310a7c2d39",
  type: "page-type/temper-rule-card-phrase",
  slug: "toggle-buy-shortfall",
  title: "Buy at a merchant or guild store what this rule is short of its target",
  key: "toggle-buy-shortfall",
  displayOrder: 511,
} as const satisfies TemperRuleCardPhrase
