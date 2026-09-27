import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockList = {
  id: "01a0e274-b2ac-7a9e-b91e-c1b77d4e8def",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-list",
  title:
    "The {action} action requires the {filter} filter to ensure only items that can be sold on the trading house are listed.",
  key: "lock-list",
  displayOrder: 36,
} as const satisfies TemperRuleCardPhrase
