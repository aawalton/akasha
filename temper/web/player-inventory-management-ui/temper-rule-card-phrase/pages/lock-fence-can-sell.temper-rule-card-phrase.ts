import type { TemperRuleCardPhrase } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/temper-rule-card-phrase.page-type.types.ts"

export const lockFenceCanSell = {
  id: "01a0e274-b2ac-7d53-8b1c-5e1b4c058d6e",
  type: "page-type/temper-rule-card-phrase",
  slug: "lock-fence-can-sell",
  title:
    "The {action} action requires the {filter} filter because fences only accept items with a vendor sell price.",
  key: "lock-fence-can-sell",
  displayOrder: 34,
} as const satisfies TemperRuleCardPhrase
