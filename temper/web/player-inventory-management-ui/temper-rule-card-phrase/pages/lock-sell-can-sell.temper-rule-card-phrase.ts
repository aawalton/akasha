import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockSellCanSell = {
  id: "01a0e274-b2ac-7fc3-868b-2d6b7af83a43",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-sell-can-sell",
  title:
    "The {action} action requires the {filter} filter to ensure only items with a vendor sell price are sold.",
  key: "lock-sell-can-sell",
  displayOrder: 35,
} as const satisfies TemperRuleCardPhrase
